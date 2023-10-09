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
import { SelfAssessmentExecutionRecordService } from './modals';

@Component({
  selector: 'app-self-assessment-execution',
  templateUrl: './self-assessment-execution.component.html',
  styleUrls: ['./self-assessment-execution.component.scss'],
})
export class SelfAssessmentExecutionComponent implements OnInit {
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
    private readonly selfAssessmentExecutionRecordService: SelfAssessmentExecutionRecordService,
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
  ngOnInit(): void {
    this.openRecordSelfAssessmentExecutionRecord();
  }

  openRecordSelfAssessmentExecutionRecord(): void {
    this.selfAssessmentExecutionRecordService.open();
  }
}
