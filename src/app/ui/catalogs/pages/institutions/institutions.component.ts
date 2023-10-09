import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { InstitutionService, UsersService } from 'src/app/core/services';
import { Alert, convertByteArrayToBlob, setDataPaginator } from 'src/app/utils/helpers';
import { ModulesCatalog, InstitucionDTOV1, TablePaginatorSearch, Vista } from 'src/app/utils/models';
import { InstitutionRecordService } from './modals';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';

@Component({
  selector: 'app-institutions',
  templateUrl: './institutions.component.html',
  styleUrls: ['./institutions.component.scss'],
})
export class InstitutionsComponent implements OnInit {
  @ViewChild('input', { static: true }) inputSearch: ElementRef;
  @ViewChild('paginator', { static: true }) readonly paginator: MatPaginator;
  data: InstitucionDTOV1[];
  dataSource: MatTableDataSource<InstitucionDTOV1>;
  selection: SelectionModel<InstitucionDTOV1>;
  disabled: boolean;
  permission: boolean;
  filters: TablePaginatorSearch;
  thisAccess: Vista;
  permissions: boolean[];
  constructor(
    private readonly institutionRecord: InstitutionRecordService,
    private readonly institutions: InstitutionService,
    private users: UsersService
  ) {
    this.data = [];
    this.dataSource = new MatTableDataSource<InstitucionDTOV1>([]);
    this.dataSource.filterPredicate = function (record: InstitucionDTOV1, filter: string): boolean {
      //todo j031
      //return true;
      return record.institucion.toLowerCase().includes(filter.toLowerCase());
    };
    this.selection = new SelectionModel<InstitucionDTOV1>(true);
    this.disabled = null;
    // this.permission = null;
    this.permissions = [false, false, false];
    this.filters = new TablePaginatorSearch();
  }

  ngOnInit(): void {
    this.setPermissions();
    this.getAllInstitutions(this.filters);
    // this.checkPermission();
    fromEvent(this.inputSearch.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        this.search(text);
      });
    this.paginator.pageSize = this.paginator.pageSizeOptions[1];
    this.paginator.pageIndex = 0;
  }

  editInstitution(institution: InstitucionDTOV1): void {
    this.institutionRecord
      .open({ data: institution })
      .afterClosed()
      .subscribe((result) => {
        // if (result == undefined || result == null || (result && result.isConfirmed)) {
        //     return;
        // }
        this.getAllInstitutions(this.filters);
      });
  }

  deleteInstitutionByConfimation(institution: InstitucionDTOV1): void {
    Alert.confirm('Eliminar la región', `¿Deseas eliminar la región?`).subscribe((result) => {
      if (!result || !result.isConfirmed) {
        return;
      }
      this.deleteInstitution(institution);
    });
  }

  openInstitutionRecord(): void {
    this.institutionRecord
      .open()
      .afterClosed()
      .subscribe(() => this.getAllInstitutions(this.filters));
  }

  search(term: string): void {
    this.dataSource.filter = term;
    this.paginator.pageIndex = 0;
    this.dataSource.paginator = this.paginator;
  }

  paginatorChange(event: PageEvent): void {
    this.filters.pageSize = event.pageSize;
    this.filters.pageNumber = event.pageIndex + 1;
    this.dataSource.paginator = this.paginator;
  }

  getAllInstitutionsExcel(): void {
    /*  this.institutions.getAllInstitutionsExcel(this.filters).subscribe((response) => {
           if (response.success) {
             convertByteArrayToBlob(response.data, response.mime, response.name);
           }
         }); */
    const url = this.institutions.getUrlAllInstitutionsExcel();
    window.open(url, '_blank');
  }

  private deleteInstitution(institution: InstitucionDTOV1): void {
    this.institutions.deleteInstitution(institution.id).subscribe(() => {
      Alert.success('', 'Región eliminada correctamente');
      this.filters.pageNumber = 1;
      this.paginator.firstPage();
      this.getAllInstitutions(this.filters);
    });
  }

  private getAllInstitutions(filters: TablePaginatorSearch): void {
    this.dataSource.data = [];
    this.data = [];
    filters.inactives = true;
    this.institutions.getAllInstitutions(filters).subscribe((response) => {
      if (response.output) {
        this.data = response.output.map((institution) => new InstitucionDTOV1().deserialize(institution));
        this.dataSource.data = this.data;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  private setPermissions(): void {
    this.thisAccess = this.users.userSession.vistas.find((element) => element.vistaId == ModuleIdV2.CAT_REGIONES);

    if (
      this.thisAccess &&
      this.thisAccess.tipoAcceso &&
      this.thisAccess.tipoAcceso.length &&
      this.thisAccess.tipoAcceso.length > 0
    ) {
      // consulta
      this.thisAccess.tipoAcceso.forEach((element, index) => {
        if (element.id == 1) this.permissions[0] = true;
        if (element.id == 2) this.permissions[1] = true;
        if (element.id == 3) this.permissions[2] = true;
      });
    }
  }

  checkPermission(p: number): boolean {
    return this.permissions[p];
  }

  applyFilter(event: Event) {
    debugger;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.data.forEach((element: any) => {
      for (const key in element) {
        if (!(typeof element[key] === 'boolean') && !Array.isArray(element[key])) {
          if (!element[key] || element[key] === null || element[key] == undefined) {
            element[key] = '';
          }
        }
      }
    });
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
