import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  CampusService,
  CyclesService,
  LevelModalityService,
  RegionsService,
  ResponsibilityAreasService,
} from 'src/app/core/services';
import {
  Anio,
  AreaResponsableDTO,
  CampusDTO,
  Ciclo,
  NivelModalidadDTO,
  RegionDTO,
  TablePaginatorSearch,
} from 'src/app/utils/models';
import { ImprovementPlanRecordService } from './modals/improvement-plan-record/improvement-plan-record.service';

@Component({
  selector: 'app-improvement-plan',
  templateUrl: './improvement-plan.component.html',
  styleUrls: ['./improvement-plan.component.scss'],
})
export class ImprovementPlanComponent {
  yearList: Anio[];
  cycleList: Ciclo[];
  regionsList: RegionDTO[];
  levelModalityList: NivelModalidadDTO[];
  campusList: CampusDTO[];
  responsibilityAreasList: AreaResponsableDTO[];
  data: any[];
  dataSource: MatTableDataSource<any>;
  selection: SelectionModel<any>;
  disabled: boolean;
  permission: boolean;
  filters: TablePaginatorSearch;
  constructor(
    private readonly cycles: CyclesService,
    private readonly levelModality: LevelModalityService,
    private readonly campus: CampusService,
    private readonly regions: RegionsService,
    private readonly improvementPlanRecordService: ImprovementPlanRecordService,
    private readonly responsibilityAreas: ResponsibilityAreasService
  ) {
    this.data = [];
    this.yearList = [];
    this.cycleList = [];
    this.regionsList = [];
    this.levelModalityList = [];
    this.campusList = [];
    this.responsibilityAreasList = [];
    this.dataSource = new MatTableDataSource<any>([]);
    this.selection = new SelectionModel<any>(true);
    this.disabled = null;
    this.permission = null;
    this.filters = new TablePaginatorSearch();
  }

  openimprovementPlanRecordService(): void {
    this.improvementPlanRecordService
      .open()
      .afterClosed()
      .subscribe(() => {});
  }
}
