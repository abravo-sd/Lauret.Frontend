import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AccreditorsService } from 'src/app/core/services';
import { AcreditadoraDTO, AcreditadoraDTOV1, AcreditadoraProcesoDTO, AcreditadoraProcesoDTOV1, CopyProcess, TablePaginatorSearch } from 'src/app/utils/models';

@Component({
    selector: 'app-copy-process',
    templateUrl: './copy-process.component.html',
    styleUrls: ['./copy-process.component.scss'],
})
export class CopyProcessComponent implements OnInit {
    copyForm: FormGroup;
    filters: TablePaginatorSearch;
    accreditorList: AcreditadoraDTOV1[];
    processList: AcreditadoraProcesoDTOV1[];

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly accreditorsService: AccreditorsService,
        private readonly matDialogRef: MatDialogRef<boolean>
    ) {
        this.filters = new TablePaginatorSearch();
        this.accreditorList = [];
        this.processList = [];
        this.copyForm = this.formBuilder.group({
            accreditation: [null, [Validators.required]],
            processOrigin: [null, [Validators.required]],
            processDestination: [null, [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.accreditorList = this.accreditorsService.accreditorsList;
    }

    changeFilter(): void {
        this.copyForm.get('processOrigin').reset();
        this.copyForm.get('processDestination').reset();
        const accreditationId = this.copyForm.get('accreditation').value;
        const processList = this.accreditorList.find((item) => item.acreditadoraId === accreditationId);
        this.processList = processList ? processList.acreditadoraProcesos : [];
    }

    submit() {
        this.matDialogRef.close(new CopyProcess().deserialize(this.copyForm.value));
    }

    get validForm(): boolean {
        const form = this.copyForm.value;
        return this.copyForm.valid && form.processOrigin !== form.processDestination ? true : false;
    }

    get isValidText(): boolean {
        if (!this.copyForm.get('processOrigin').touched || !this.copyForm.get('processDestination').touched) {
            return true;
        }
        const form = this.copyForm.value;
        return form.processOrigin !== form.processDestination ? true : false;
    }
}
