import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { SettingsWelcomeService, UsersService } from 'src/app/core/services';
import { IndicadorDTO, SettingsWelcomeDTO, ListaArchivosModuloBienvenida } from 'src/app/utils/models';
import Quill from 'quill';
import BlotFormatter, { DeleteAction, ImageSpec, ResizeAction } from 'quill-blot-formatter';
import { environment } from 'src/environments/environment';

Quill.register('modules/blotFormatter', BlotFormatter);

class CustomImageSpec extends ImageSpec {
    getActions() {
        return [ResizeAction, DeleteAction];
    }
}

// j031 230811
import { LIMIT_BLOB_SIZE_FILE } from 'src/app/utils/constants';
import { Alert, DateHelper } from 'src/app/utils/helpers';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-setting-welcome',
    templateUrl: './welcome-settings-record.component.html',
    styleUrls: ['./welcome-settings-record.component.scss']
})
export class WelcomeSettingsRecordComponent implements OnInit, OnDestroy {
    cfgIndicatorRecordForm: UntypedFormGroup;
    quillDisplayModuleOptions: any;
    quillEditorModuleOptions: any;
    settingsForm: UntypedFormGroup;
    data: SettingsWelcomeDTO;
    listaArchivos: ListaArchivosModuloBienvenida[];
    disabled: boolean;
    permission: boolean;
    edit: boolean;
    subscription: Subscription;
    htmlData: any;
    editorData: any;
    archivos: FormData[];
    constructor(
        private readonly formBuilder: UntypedFormBuilder,
        private readonly settingsWelcomeService: SettingsWelcomeService,
        private users: UsersService,
        private _sanitizer: DomSanitizer,
        private readonly router: Router
    ) {
        this.data = new SettingsWelcomeDTO();
        this.listaArchivos = [];
        this.archivos = [];
        this.disabled = null;
        this.permission = null;
        this.edit = null;
        this.subscription = new Subscription();
        this.htmlData = '';
        this.editorData = '';
        this.settingsForm = this.formBuilder.group({
            editorSettings: [null],
        });
    }

    ngOnInit(): void {
        this.quillDisplayModuleOptions = { toolbar: false };
        this.quillEditorModuleOptions = {
            blotFormatter: {
                specs: [CustomImageSpec],
            },
            syntax: false, // Include syntax module
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                // ["blockquote", "code-block"],
                [{ header: 1 }, { header: 2 }], // custom button values
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
                [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
                [{ direction: 'rtl' }], // text direction
                [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                [{ font: [] }],
                [{ align: [] }],
                ['clean'], // remove formatting button
                ['link', 'image', 'video'], // link and image, video
            ],
        };
        this.settingsWelcomeService.getConfigPantallaBienvenida().subscribe((response) => {
            if (!response.output) {
                return;
            }
            const data = new SettingsWelcomeDTO().deserialize(response.output[0]);
            this.data = data;

            console.log(this.data);
            this.patchValueQuillEditor(this.data.htmlBienvenida);
            this.trackingStatusForm();
        });

        this.settingsWelcomeService.getListFilesWelcomeModule().subscribe((response) => {
            if (!response.output) {
                return;
            }
            this.listaArchivos = response.output.map((item) => new ListaArchivosModuloBienvenida().deserialize(item));

            // console.log(this.data);
            // //this.patchValueQuillEditor(this.data.htmlBienvenida);
            // this.trackingStatusForm();
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private patchValueQuillEditor(data: any): void {
        this.htmlData = data;
        this.settingsForm.get('editorSettings').patchValue(data);
        this.settingsForm.updateValueAndValidity();
    }

    contentChanged(contentChangedEvent: any) {
        this.editorData = contentChangedEvent.html;
    }

    submit(): void {
        const setting: SettingsWelcomeDTO = new SettingsWelcomeDTO();
        setting.id = this.data.id;
        setting.htmlBienvenida = this.settingsForm.get('editorSettings').value;
        this.settingsWelcomeService.updatePantallaBienvenida(setting).subscribe(() => {
            Alert.success('', 'Configuración actualizada correctamente');
            this.router.navigate(['/welcome-screen']);
            return;
        });
    }

    cancelByConfimation(): void {
        if (!this.edit) {
            this.router.navigate(['/welcome-screen']);
            return;
        }
        Alert.confirm('Alerta', '¿Está seguro de que desea salir? Los datos ingresados no serán guardados.').subscribe(
            (result) => {
                if (!result || !result.isConfirmed) {
                    return;
                }
                this.router.navigate(['/welcome-screen']);
            }
        );
    }

    private trackingStatusForm(): void {
        this.subscription.add(this.settingsForm.statusChanges.subscribe(() => (this.edit = true)));
    }

    UploadFileToWelcomeModule(files: File[]): void {
        this.archivos = [];
        files.forEach(async (item) => {
            if (item.size >= LIMIT_BLOB_SIZE_FILE) {
                Alert.error('El archivo' + item.name + ' no debe sobrepasar los 20 mb');
                return;
            }
            const formData: FormData = new FormData();
            formData.append('file', item, item.name);
            //formData.append('FechaCreacion', DateHelper.convertToStringWithFormat(new Date(), DateHelper.FULL_DATE_FORMAT));
            //formData.append('UsuarioCreacion', this.users.userSession.nombre);
            this.archivos.push(formData);
            for (let item of this.archivos) {
                await this.settingsWelcomeService.uploadAzureStorageFile(item);
                //indicadorDto.archivos.push(data.id);
            }
            Alert.success('', ' Tu archivo se ha subido exitosamente.');

            //Actualizamos la la lista de archivos
            this.settingsWelcomeService.getListFilesWelcomeModule().subscribe((response) => {
                if (!response.output) {
                    return;
                }
                this.listaArchivos = response.output.map((item) => new ListaArchivosModuloBienvenida().deserialize(item));
            });

        });
        //this.cfgIndicatorRecordForm.get('files').patchValue(this.archivos.length > 0 ? 1 : null, { emitEvent: true });
        //this.cfgIndicatorRecordForm.updateValueAndValidity();
    }

    downloadFile(file: any): void {
        console.log(file);
        this.settingsWelcomeService.downloadAzureStorageFile(file.uri).subscribe((response: any) => {
            if (response) {
                let blob = new Blob([response]);
                let nameFile = file.name;
                let url = window.URL.createObjectURL(blob);

                // IE doesn't allow using a blob object directly as link href
                // instead it is necessary to use msSaveOrOpenBlob
                if (window.navigator && (window.navigator as any).msSaveOrOpenBlob) {
                    blob = this.auto_bom(blob);
                    (window.navigator as any).msSaveOrOpenBlob(blob, nameFile);
                }

                let a = document.createElement('a');
                document.body.appendChild(a);
                a.setAttribute('style', 'display: none');
                a.href = url;
                a.download = nameFile;
                a.click();
                window.URL.revokeObjectURL(url);
                a.parentNode.removeChild(a);

                setTimeout(() => {
                    // For Firefox it is necessary to delay revoking the ObjectURL
                    window.URL.revokeObjectURL(url);
                }, 100);
            }
        });
    }

    async deleteFile(file: any): Promise<void> {
        const formData: FormData = new FormData();
        formData.append('blobFilename', file.uri);
        this.archivos.push(formData);
        await this.settingsWelcomeService.deleteAzureStorageFile(formData);
        Alert.success('', 'El archivo ha sido eliminado.');
        //window.location.reload();
        //Actualizamos la la lista de archivos
        this.settingsWelcomeService.getListFilesWelcomeModule().subscribe((response) => {
            if (!response.output) {
                return;
            }
            this.listaArchivos = response.output.map((item) => new ListaArchivosModuloBienvenida().deserialize(item));
        });
    }

    previewFile(file: any): boolean {
        console.log(file);
        navigator.clipboard.writeText(environment.api.concat(`/AzureStorage/DownloadFromWelcomeModule/${file.name}`));

        this.settingsWelcomeService.downloadAzureStorageFile(file.uri).subscribe((response: any) => {
            if (response) {
                let blob = new Blob([response]);
                let title = 'Vista previa de la imagen';
                let url = window.URL.createObjectURL(blob);
                let width = 'auto';
                const fileExtension = file.name.split('.').pop()?.toLowerCase();
                let tag = `<img src="${url}" alt="Imagen"  style="display: initial; width: auto; height: auto; max-height: 600px;">`;
                if (fileExtension && 'pdf'.includes(fileExtension)) {
                    width = '75%';
                    title = 'Vista previa de documento';
                    // Crear un objeto de archivo con los datos del blob y el nombre modificado
                    var pdfFileName = 'vistaPrevia.pdf'; // Cambiar el nombre del archivo con la extensión .pdf
                    var pdfFile = new File([blob], pdfFileName, { type: 'application/pdf' });
                    url = window.URL.createObjectURL(pdfFile);
                    tag = `
        <iframe src="${url}" class="img-responsive" style="width:100%;height:600px;"></iframe>
      `;
                }

                Swal.fire({
                    title: title,
                    html: tag, // Pasar la etiqueta de imagen como contenido HTML
                    width: width,
                }).then(() => {
                    Alert.success('', 'URL copiado');
                });
                //return;
            }
        });
        // Alert.success('', 'URL copiado');

        return true;
    }
    copyUrl(file: any): boolean {
        navigator.clipboard.writeText(environment.api.concat(`/AzureStorage/DownloadFromWelcomeModule/${file.name}`));
        Alert.success('', 'URL copiado');
        Alert.success('', 'URL copiado');
        return true;
    }

    private auto_bom(blob: Blob): Blob {
        // prepend BOM for UTF-8 XML and text/* types (including HTML)
        // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
        if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
            return new Blob([String.fromCharCode(0xfeff), blob], { type: blob.type });
        }
        return blob;
    }

    canPreviewFile(nombreArchivo: string): boolean {
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp']; // Agrega aquí más extensiones de imagen si es necesario

        const fileExtension = nombreArchivo.split('.').pop()?.toLowerCase();

        if (fileExtension && (imageExtensions.includes(fileExtension) || 'pdf'.includes(fileExtension))) {
            return true; // El archivo puede tener vista previa
        } else {
            return false; // El archivo no tiene una extensión válida
        }
    }
}
