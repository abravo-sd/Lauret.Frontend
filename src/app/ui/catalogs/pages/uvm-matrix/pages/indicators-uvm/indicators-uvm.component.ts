import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { IndicatorService, IndicatorUvmService, UsersService } from 'src/app/core/services';
import { Alert, convertByteArrayToBlob, setDataPaginator } from 'src/app/utils/helpers';
import {
  ComponenteUVMDTO,
  IndicadorDTO,
  IndicadorUVMDTO,
  IndicadorUVMDTOV1,
  TablePaginatorSearch, Vista
} from 'src/app/utils/models';
import { IndicatorUvmRecordService } from './modals';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';

@Component({
  selector: 'app-indicators-uvm',
  templateUrl: './indicators-uvm.component.html',
  styleUrls: ['./indicators-uvm.component.scss'],
})
export class IndicatorsUvmComponent implements OnInit {
  @ViewChild('input', { static: true }) inputSearch: ElementRef;
  @ViewChild('paginator', { static: true }) readonly paginator: MatPaginator;
  selection: SelectionModel<IndicadorUVMDTOV1>;
  disabled: boolean;
  dataSource: MatTableDataSource<IndicadorUVMDTOV1>;
  filters: TablePaginatorSearch;
  data: IndicadorUVMDTOV1[];
  thisAccess: Vista;
  permissions: boolean[];
  constructor(
    private readonly indicatorUvmRecordService: IndicatorUvmRecordService,
    private readonly indicatorService: IndicatorUvmService,
    private users: UsersService
  ) {
    this.dataSource = new MatTableDataSource<IndicadorUVMDTOV1>([]);
    this.dataSource.filterPredicate = function (record: IndicadorUVMDTOV1, filter: string): boolean {
      return record.nombreIndicadorUvm.toLowerCase().includes(filter.toLowerCase()) ||
        record.nombreComponenteUvm.toLowerCase().includes(filter.toLowerCase());
    };
    this.data = [];
    this.filters = new TablePaginatorSearch();
    this.permissions = [false, false, false];
  }

  ngOnInit(): void {
    this.setPermissions();
    this.getAllIndicatorsUvm(this.filters);
    // fromEvent(this.inputSearch.nativeElement, 'keyup')
    //   .pipe(
    //     map((event: any) => event.target.value),
    //     debounceTime(1000),
    //     distinctUntilChanged()
    //   )
    //   .subscribe((text: string) => {
    //     this.search(text);
    //   });
    this.paginator.pageSize = this.paginator.pageSizeOptions[1];
    this.paginator.pageIndex = 0;
  }

  search(term: string): void {
    this.dataSource.filter = term;
    this.filters.pageNumber = 0;
    this.dataSource.paginator = this.paginator;
  }
  paginatorChange(event: PageEvent): void {
    this.filters.pageSize = event.pageSize;
    this.filters.pageNumber = event.pageIndex + 1;
    this.dataSource.paginator = this.paginator;
  }

  openIndicatorUvmRecordService(): void {
    this.indicatorUvmRecordService
      .open()
      .afterClosed()
      .subscribe(() => {
        this, this.getAllIndicatorsUvm(this.filters);
      });
  }

  editIndicatorUvmRecordService(indicador: IndicadorUVMDTOV1): void {
    this.indicatorUvmRecordService
      .open({ data: indicador })
      .afterClosed()
      .subscribe(() => {
        this.getAllIndicatorsUvm(this.filters);
      });
  }

  deleteIndicadorUvmByConfimation(indicador: IndicadorUVMDTOV1): void {
    Alert.confirm('Eliminar indicador uvm', `¿Deseas eliminar el componente?`).subscribe((result) => {
      if (!result || !result.isConfirmed) {
        return;
      }
      this.deleteIndicatorUvm(indicador);
    });
  }

  getAllIndicatorsExcel(): void {
    /* this.indicatorService.getAllIndicatorsUvmExcel(this.filters).subscribe((response) => {
      if (response.success) {
        convertByteArrayToBlob(response.data, response.mime, response.name);
      }
    }); */

    const url = this.indicatorService.getUrlAllIndicatorsUvmExcel();
    window.open(url, '_blank');
  }

  private getAllIndicatorsUvm(filter: TablePaginatorSearch) {
    this.dataSource.data = [];
    this.data = [];
    filter.inactives = true;
    this.indicatorService.getAllIndicatorsUvm(filter).subscribe((response) => {
      if (response.output) {
        this.data = response.output.map((indicador) => new IndicadorUVMDTOV1().deserialize(indicador));
        this.dataSource.data = this.data;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  private deleteIndicatorUvm(indicador: IndicadorUVMDTOV1): void {
    this.indicatorService.deleteIndicatorUvm(indicador.id).subscribe(() => {
      this.filters.pageNumber = 1;
      this.paginator.firstPage();
      this.getAllIndicatorsUvm(this.filters);
      Alert.success('', 'Indicador uvm eliminado correctamente');
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.data.forEach((element: any) => {
      for (const key in element) {
        if (!(typeof element[key] === 'boolean') && !(Array.isArray(element[key]))) {
          if (!element[key] || element[key] === null || element[key] == undefined) {
            element[key] = '';
          }
        }
      }
    });
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  private setPermissions(): void {
    this.thisAccess = this.users.userSession.vistas.find(element => element.vistaId == ModuleIdV2.CAT_INDICADOR_UVM);

    if (this.thisAccess && this.thisAccess.tipoAcceso && this.thisAccess.tipoAcceso.length && this.thisAccess.tipoAcceso.length >0)   // consulta
    {
        this.thisAccess.tipoAcceso.forEach((element, index) => {
            if (element.id == 1) this.permissions[0] =  true ;
            if (element.id == 2) this.permissions[1] =  true ;
            if (element.id == 3) this.permissions[2] =  true ;
        });
    }
}

checkPermission(p: number): boolean {
    return this.permissions[p];
}
}
