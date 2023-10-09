import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
    CyclesService,
    LevelModalityService,
    CampusService,
    RegionsService,
    ResponsibilityAreasService,
} from 'src/app/core/services';
import {
    Anio,
    Ciclo,
    RegionDTO,
    NivelModalidadDTO,
    CampusDTO,
    AreaResponsableDTO,
    TablePaginatorSearch,
} from 'src/app/utils/models';

@Component({
    selector: 'app-audit',
    templateUrl: './audit.component.html',
    styleUrls: ['./audit.component.scss'],
})
export class AuditComponent {
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
}
