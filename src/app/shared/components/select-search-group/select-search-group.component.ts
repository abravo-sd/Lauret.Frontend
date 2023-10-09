import {
  AfterViewInit,
  Component,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';

@Component({
  selector: 'select-search-group',
  templateUrl: './select-search-group.component.html',
  styleUrls: ['./select-search-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectSearchGroupComponent,
      multi: true,
    },
  ],
})
export class SelectSearchGroupComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit, ControlValueAccessor {
  @ViewChild('multiSelect', { static: true }) multiSelect!: MatSelect;
  @ViewChild(FormControlDirective, { static: true })
  formControlDirective: FormControlDirective | undefined;

  @Input() data: any[];

  //TypeObject
  @Input() value: string;
  //TypeGroup
  @Input() groupName: string;
  @Input() groupSubName: string;
  @Input() groupListName: string;

  @Input() selectedElementsText: string;
  @Input() multiple: boolean;
  @Input()
  formControl: FormControl = new FormControl();
  @Input()
  formControlName: string = '';
  @Input() label: string;
  @Input() noFoundText: string;
  @Input() searchText: string;
  @Input() disableOptions: any[];
  @Output() changeSelect: EventEmitter<any>;
  @Output() previousSelect: EventEmitter<any>;

  controlSearch: FormControl = new FormControl();
  filteredData: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  filteredDataCache: any[] = [];
  isIndeterminate = false;
  isChecked = false;
  _onDestroy = new Subject<void>();

  constructor(private injector: Injector) {
    this.data = [];
    this.value = 'valor';
    this.groupName = 'name';
    this.groupListName = 'groups';
    this.groupSubName = 'name';
    this.selectedElementsText = '';
    this.multiple = false;
    this.label = 'Seleccione una opción...';
    this.searchText = 'Buscar';
    this.noFoundText = 'No se encontró ninguna coincidencia.';
    this.disableOptions = [];
    this.changeSelect = new EventEmitter();
    this.previousSelect = new EventEmitter();
  }
  ngAfterViewInit(): void {
    this.setInitialValue();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('data' in changes && this.data) {
      this.filteredData.next(this.data.slice());
    }
  }

  ngOnInit() {
    if (this.data) {
      this.filteredData.next(this.data.slice());
    }

    if (!this.multiple) {
      this.filteredData.next(this.copyGroups(this.data.slice()));
    }

    this.controlSearch.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.filterDataMulti();
      if (this.multiple) {
        this.setToggleAllCheckboxState();
      }
    });

    this.control.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      if (this.multiple) {
        this.setToggleAllCheckboxState();
      }
    });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  toggleSelectAll(selectAllValue: boolean) {
    this.filteredData.pipe(take(1), takeUntil(this._onDestroy)).subscribe((val: any) => {
      const aux: any = [];

      val.forEach((item: any) => {
        item[this.groupListName].forEach((item2: any) => {
          aux.push(item2);
        });
      });

      val = aux;

      if (selectAllValue) {
        this.control.patchValue(val);
        this.change();
      } else {
        this.control.patchValue([]);
        this.change();
      }
    });
  }

  filterDataMulti() {
    if (!this.data) {
      return;
    }

    let search = this.controlSearch.value;

    if (!search) {
      this.filteredDataCache = this.copyGroups(this.data);

      this.filteredData.next(this.filteredDataCache);
      return;
    } else {
      search = search.toLowerCase();
    }

    const groupsCopy = this.copyGroups(this.data);
    this.filteredDataCache = groupsCopy.filter((bankGroup: any) => {
      const showBankGroup = bankGroup[this.groupName].toLowerCase().indexOf(search) > -1;
      if (!showBankGroup) {
        bankGroup[this.groupListName] = bankGroup[this.groupListName].filter(
          (bank: any) => bank[this.groupName].toLowerCase().indexOf(search) > -1
        );
      }
      return bankGroup[this.groupListName].length > 0;
    });

    this.filteredData.next(this.filteredDataCache);
  }

  setToggleAllCheckboxState() {
    let filteredLength = 0;

    if (this.control && this.control.value) {
      this.filteredDataCache.forEach((el) => {
        if (this.control.value.indexOf(el) > -1) {
          filteredLength++;
        }
      });

      this.isIndeterminate = filteredLength > 0 && filteredLength < this.filteredDataCache.length;
      this.isChecked = filteredLength > 0 && filteredLength === this.filteredDataCache.length;
    }
  }

  change() {
    this.changeSelect.emit(this.control.value);
  }

  getPreviousValue(openSelect: boolean) {
    if (openSelect) {
      this.previousSelect.emit(this.control.value);
    }
  }

  copyGroups(groups: any) {
    const groupsCopy: any = [];
    groups.forEach((group: any) => {
      groupsCopy.push({
        [this.groupName]: group[this.groupName],
        [this.groupListName]: group[this.groupListName].slice(),
      });
    });
    return groupsCopy;
  }

  setInitialValue() {
    //Falta inicializar correctamente cuando es un grupo simple
    if (this.multiple) {
      this.filteredData.pipe(take(1), takeUntil(this._onDestroy)).subscribe(() => {
        this.multiSelect.compareWith = (a, b) => a && b && a[this.value] === b[this.value];
      });
    }
  }

  getLengthData(): string {
    if (!this.data || !this.control.value) {
      return '';
    }

    let length = 0;
    this.data.forEach((group) => {
      length += group[this.groupListName].length;
    });

    if (this.control && this.control.value.length === length) {
      return 'Todos';
    } else if (this.control && this.control.value.length > 1 && this.control.value.length < length) {
      return `${this.selectedElementsText} (${this.control.value.length})`;
    } else if (this.control && this.control.value.length === 1 && this.control.value.length < length) {
      let aux = '';

      aux = this.control.value[0][this.groupSubName];

      return aux;
    } else {
      return '';
    }
  }

  getDisableOptionsSelect(option: any): boolean {
    return this.disableOptions.includes(option) ? true : false;
  }

  get control(): any {
    if (this.formControlName !== '') {
      return this.controlContainer.control?.get(this.formControlName);
    }
    return this.formControl;
  }

  get controlContainer() {
    return this.injector.get(ControlContainer);
  }

  registerOnTouched(fn: any): void {
    if (!this.formControlDirective) {
      return;
    }
    this.formControlDirective.valueAccessor?.registerOnTouched(fn);
  }

  registerOnChange(fn: any): void {
    if (!this.formControlDirective) {
      return;
    }
    this.formControlDirective.valueAccessor?.registerOnChange(fn);
  }

  writeValue(obj: any): void {
    if (!this.formControlDirective) {
      return;
    }
    this.formControlDirective.valueAccessor?.writeValue(obj);
  }
}
