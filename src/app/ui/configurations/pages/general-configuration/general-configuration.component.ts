import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { UsersService } from 'src/app/core/services';
import { GeneralConfigurationService } from 'src/app/core/services/api/general-configuration/general-configuration.service';
import { Alert, convertByteArrayToBlob, setDataPaginator } from 'src/app/utils/helpers';
import { ConfNivelAreaResponsableDTO, TablePaginatorSearch } from 'src/app/utils/models';
import { GeneralConfigurationRecordService } from './modals/general-configuration-record/general-configuration-record.service';

@Component({
  selector: 'app-general-configuration',
  templateUrl: './general-configuration.component.html',
  styleUrls: ['./general-configuration.component.scss'],
})
export class GeneralConfigurationComponent implements OnInit {
  @ViewChild('input', { static: true }) inputSearch: ElementRef;
  @ViewChild('paginator', { static: true }) readonly paginator: MatPaginator;
  data: ConfNivelAreaResponsableDTO[];
  dataSource: MatTableDataSource<ConfNivelAreaResponsableDTO>;
  selection: SelectionModel<ConfNivelAreaResponsableDTO>;
  disabled: boolean;
  permission: boolean;
  filters: TablePaginatorSearch;
  constructor(
    private readonly generalConfigurationRecord: GeneralConfigurationRecordService,
    private readonly generalConfiguration: GeneralConfigurationService,
    private users: UsersService
  ) {
    this.data = [];
    this.dataSource = new MatTableDataSource<ConfNivelAreaResponsableDTO>([]);
    this.selection = new SelectionModel<ConfNivelAreaResponsableDTO>(true);
    this.disabled = null;
    this.permission = null;
    this.filters = new TablePaginatorSearch();
  }

  ngOnInit(): void {
    this.getAllGeneralConfiguration(this.filters);
    fromEvent(this.inputSearch.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        this.search(text);
      });
  }
  editGeneralConfiguration(configuracionGeneral: ConfNivelAreaResponsableDTO): void {
    this.generalConfigurationRecord
      .open({ data: configuracionGeneral })
      .afterClosed()
      .subscribe(() => this.getAllGeneralConfiguration(this.filters));
  }

  paginatorChange(event: PageEvent): void {
    this.filters.pageSize = event.pageSize;
    this.filters.pageNumber = event.pageIndex + 1;
    this.getAllGeneralConfiguration(this.filters);
  }

  deleteGeneralConfigurationByConfimation(configuracionGeneral: ConfNivelAreaResponsableDTO): void {
    Alert.confirm('Eliminar configuración', `¿Deseas eliminar la configuración?`).subscribe((result) => {
      if (!result || !result.isConfirmed) {
        return;
      }
      this.deleteGeneralConfiguration(configuracionGeneral);
    });
  }

  openGeneralConfiguration(): void {
    this.generalConfigurationRecord
      .open()
      .afterClosed()
      .subscribe(() => this.getAllGeneralConfiguration(this.filters));
  }

  private deleteGeneralConfiguration(configuracionGeneral: ConfNivelAreaResponsableDTO): void {
    this.generalConfiguration.deleteGeneralConfiguration(configuracionGeneral.configuracionGeneralId).subscribe(() => {
      this.filters.pageNumber = 1;
      this.paginator.firstPage();
      this.getAllGeneralConfiguration(this.filters);
      Alert.success('', 'Configuración eliminado correctamente');
    });
  }
  search(term: string): void {
    this.dataSource.filter = term;
    this.filters.search = term;
    this.filters.pageNumber = 1;
    this.paginator.firstPage();
    this.getAllGeneralConfiguration(this.filters);
  }

  private getAllGeneralConfiguration(filters: TablePaginatorSearch): void {
    this.dataSource.data = [];
    this.data = [];
    filters.inactives = true;
    this.generalConfiguration.getAllGeneralConfigurations(filters).subscribe((response) => {
      if (response.data.data) {
        this.data = response.data.data.map((campus) => new ConfNivelAreaResponsableDTO().deserialize(campus));
        this.dataSource.data = this.data;
        setDataPaginator(this.paginator, response.data.totalCount);
      }
    });
  }

  getAllGeneralConfigurationsExcel(): void {
    this.generalConfiguration.getAllGeneralConfigurationsExcel(this.filters).subscribe((response) => {
      if (response.success) {
        convertByteArrayToBlob(response.data, response.mime, response.name);
      }
    });
  }
}
