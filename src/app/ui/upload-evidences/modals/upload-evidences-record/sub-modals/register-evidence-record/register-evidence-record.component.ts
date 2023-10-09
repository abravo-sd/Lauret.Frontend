import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  CampusService,
  ComponentsService,
  CyclesService,
  LevelModalityService,
  RegionsService,
} from 'src/app/core/services';
import {
  Anio,
  AreaResponsableDTO,
  CampusDTO,
  Ciclo,
  ComponenteDTO,
  NivelModalidadDTO,
  RegionDTO,
} from 'src/app/utils/models';

@Component({
  selector: 'app-register-evidence-record',
  templateUrl: './register-evidence-record.component.html',
  styleUrls: ['./register-evidence-record.component.scss'],
})
export class RegisterEvidenceRecordComponent implements OnInit {
  yearList: Anio[];
  cycleList: Ciclo[];
  regionsList: RegionDTO[];
  levelModalityList: NivelModalidadDTO[];
  campusList: CampusDTO[];
  responsibilityAreasList: AreaResponsableDTO[];
  componentList: ComponenteDTO[];
  constructor(
    private readonly cycles: CyclesService,
    private readonly levelModality: LevelModalityService,
    private readonly campus: CampusService,
    private readonly regions: RegionsService,
    private readonly components: ComponentsService,
    private readonly ref: MatDialogRef<never>
  ) {
    this.yearList = [];
    this.cycleList = [];
    this.regionsList = [];
    this.levelModalityList = [];
    this.campusList = [];
    this.responsibilityAreasList = [];
    this.componentList = [];
  }
  ngOnInit(): void {
    // console.log('');
  }
  closeModalByConfimation(): void {
    if (true) {
      this.ref.close();
      return;
    }
  }
}
