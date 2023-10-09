import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AccreditorsService, SchoolCareerService } from 'src/app/core/services';
import {
    AcreditadoraDTO,
    AcreditadoraDTOV1,
    AcreditadoraProcesoDTO,
    AcreditadoraProcesoDTOV1,
    CarreraDTO,
    CopyProcess,
    TablePaginatorSearch,
} from 'src/app/utils/models';

@Component({
    templateUrl: './criteria-copy.component.html',
    styleUrls: ['./criteria-copy.component.scss'],
})
export class CriteriaCopyComponent {
    copyForm: FormGroup;
    filters: TablePaginatorSearch;
    accreditorList: AcreditadoraDTOV1[];
    processList: AcreditadoraProcesoDTOV1[];
    careersList: CarreraDTO[];

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly accreditors: AccreditorsService,
        private readonly schoolCareer: SchoolCareerService,
        private readonly matDialogRef: MatDialogRef<boolean>
    ) {
        this.filters = new TablePaginatorSearch();
        this.accreditorList = [];
        this.processList = [];
        this.careersList = this.schoolCareer.careersList;
        this.accreditorList = this.accreditors.accreditorsList;
        this.copyForm = this.formBuilder.group({
            accreditation: [null, [Validators.required]],
            processOrigin: [null, [Validators.required]],
            processDestination: [null, [Validators.required]],
            careerOrigin: [null, [Validators.required]],
            careerDestination: [null, [Validators.required]],
        });
    }

    changeFilter(): void {
        this.copyForm.get('processOrigin').reset();
        this.copyForm.get('processDestination').reset();
        const accreditationId = this.copyForm.get('accreditation').value;
        const processList = this.accreditorList.find((item) => item.acreditadoraId === accreditationId);
        this.processList = processList ? processList.acreditadoraProcesos : [];
    }

    isDifferentValue(): boolean {
        if (
            !this.copyForm.get('processOrigin').touched ||
            !this.copyForm.get('processDestination').touched ||
            !this.copyForm.get('careerOrigin').touched ||
            !this.copyForm.get('careerDestination').touched
        ) {
            return true;
        }
        const form = this.copyForm.value;
        return form.processOrigin === form.processDestination && form.careerOrigin === form.careerDestination
            ? false
            : true;
    }

    submit(): void {
        this.matDialogRef.close(new CopyProcess().deserialize(this.copyForm.value));
    }

    get isValidForm(): boolean {
        const form = this.copyForm.value;
        if (this.copyForm.invalid) {
            return false;
        }
        return form.processOrigin === form.processDestination && form.careerOrigin === form.careerDestination
            ? false
            : true;
    }
}
