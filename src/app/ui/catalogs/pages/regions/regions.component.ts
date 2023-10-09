import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { RegionsService, UsersService } from 'src/app/core/services';
import { Alert, convertByteArrayToBlob, setDataPaginator } from 'src/app/utils/helpers';
import { ModulesCatalog, RegionDTO, RegionDTOV1, TablePaginatorSearch, Vista } from 'src/app/utils/models';
import { RegionRecordService } from './modals';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss'],
})
export class RegionsComponent implements OnInit {
  @ViewChild('input', { static: true }) inputSearch: ElementRef;
  @ViewChild('paginator', { static: true }) readonly paginator: MatPaginator;
  data: RegionDTOV1[];
  dataSource: MatTableDataSource<RegionDTOV1>;
  selection: SelectionModel<RegionDTOV1>;
  disabled: boolean;
  permission: boolean;
  filters: TablePaginatorSearch;
  thisAccess: Vista;
  permissions: boolean[];
  constructor(
    private readonly regionRecord: RegionRecordService,
    private readonly regions: RegionsService,
    private users: UsersService
  ) {
    this.data = [];
    this.dataSource = new MatTableDataSource<RegionDTOV1>([]);
    this.dataSource.filterPredicate = function (record: RegionDTOV1, filter: string): boolean {
      return (
        record.clave.toLowerCase().includes(filter.toLowerCase()) ||
        record.nombre.toLowerCase().includes(filter.toLowerCase()) ||
        record.directorRegional.toLowerCase().includes(filter.toLowerCase())
      );
    };
    this.selection = new SelectionModel<RegionDTOV1>(true);
    this.disabled = null;
    // this.permission = null;
    this.permissions = [false, false, false];
    this.filters = new TablePaginatorSearch();
  }

  ngOnInit(): void {
    this.setPermissions();
    this.getAllRegions(this.filters);
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

  editRegion(region: RegionDTOV1): void {
    this.regionRecord
      .open({ data: region })
      .afterClosed()
      .subscribe((result) => {
        // if (result == undefined || result == null || (result && result.isConfirmed)) {
        //     return;
        // }
        this.getAllRegions(this.filters);
      });
  }

  deleteRegionByConfimation(region: RegionDTOV1): void {
    Alert.confirm('Eliminar la región', `¿Deseas eliminar la región?`).subscribe((result) => {
      if (!result || !result.isConfirmed) {
        return;
      }
      this.deleteRegion(region);
    });
  }

  openRegionRecord(): void {
    this.regionRecord
      .open()
      .afterClosed()
      .subscribe(() => this.getAllRegions(this.filters));
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

  getAllRegionsExcel(): void {
    /*  this.regions.getAllRegionsExcel(this.filters).subscribe((response) => {
           if (response.success) {
             convertByteArrayToBlob(response.data, response.mime, response.name);
           }
         }); */
    const url = this.regions.getUrlAllRegionsExcel();
    window.open(url, '_blank');
  }

  private deleteRegion(region: RegionDTOV1): void {
    this.regions.deleteRegion(region.id).subscribe(() => {
      Alert.success('', 'Región eliminada correctamente');
      this.filters.pageNumber = 1;
      this.paginator.firstPage();
      this.getAllRegions(this.filters);
    });
  }

  private getAllRegions(filters: TablePaginatorSearch): void {
    this.dataSource.data = [];
    this.data = [];
    filters.inactives = true;
    this.regions.getAllRegions(filters).subscribe((response) => {
      if (response.output) {
        this.data = response.output.map((region) => new RegionDTOV1().deserialize(region));
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
