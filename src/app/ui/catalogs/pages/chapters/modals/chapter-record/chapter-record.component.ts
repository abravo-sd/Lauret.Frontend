import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { ValidatorService } from 'src/app/shared/validators';
import { Alert } from 'src/app/utils/helpers';
import { CapituloDTO, CapituloDTOV1 } from 'src/app/utils/models';
import { Response, ResponseV1 } from 'src/app/utils/interfaces';
import { ChapterService } from 'src/app/core/services';
import { TransitionCheckState } from '@angular/material/checkbox';

@Component({
    templateUrl: './chapter-record.component.html',
    styleUrls: ['./chapter-record.component.scss'],
})
export class ChapterRecordComponent implements OnInit, OnDestroy {
    chapterForm: FormGroup;
    typeModal: 'edit' | 'add';
    subscription: Subscription;
    status: boolean;

    constructor(
        @Inject(MAT_DIALOG_DATA) public readonly data: CapituloDTOV1,
        private readonly matDialogRef: MatDialogRef<boolean>,
        private readonly formBuilder: FormBuilder,
        private readonly validator: ValidatorService,
        private readonly chapter: ChapterService
    ) {
        this.typeModal = this.data.capituloId ? 'edit' : 'add';
        this.subscription = new Subscription();
        this.status = false;

        this.chapterForm = this.formBuilder.group({
            acreditadoraProcesoId: [null, [Validators.required]],
            capituloId: [null, [Validators.required, this.validator.noWhitespace]],
            nombre: [null, [Validators.required, Validators.maxLength(500), this.validator.noWhitespace]],
            descripcion: [null, [Validators.required, Validators.maxLength(500), this.validator.noWhitespace]],
        });
    }

    ngOnInit(): void {
        this.chapterForm.disable();
        this.chapterForm.patchValue(this.data);
        if (this.typeModal === 'edit') {
            this.chapterForm.get('capituloId').disable();
        }
        this.trackingStatusForm();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    closeModalByConfimation(): void {
        if (!this.status) {
            this.matDialogRef.close();
            return;
        }
        Alert.confirm('Alerta', '¿Está seguro de que desea salir? Los datos ingresados no serán guardados.').subscribe(
            (result) => {
                if (!result || !result.isConfirmed) {
                    return;
                }
                this.matDialogRef.close();
            }
        );
    }

    submit(): void {
        const body: CapituloDTOV1 = this.chapterForm.getRawValue();
        let aux: Observable<ResponseV1<never>>;
        let text = 'Capítulo creado correctamente';

        switch (this.typeModal) {
            case 'add':
                aux = this.chapter.createChapter(body);
                break;
            case 'edit':
                aux = this.chapter.updateChapter(body);
                text = 'Capítulo actualizado correctamente';
                break;
        }

        aux.subscribe((response) => {
            if (response.exito) {
                Alert.success('', text);
                this.matDialogRef.close(true);
            }
        });
    }

    private trackingStatusForm(): void {
        this.subscription.add(this.chapterForm.statusChanges.subscribe(() => (this.status = true)));
    }
}
