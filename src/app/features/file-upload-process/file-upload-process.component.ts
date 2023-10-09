import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CargaArchivoResult } from 'src/app/utils/models';

@Component({
  selector: 'app-file-upload-process',
  templateUrl: './file-upload-process.component.html',
  styleUrls: ['./file-upload-process.component.scss'],
})
export class FileUploadProcessComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: CargaArchivoResult) {}
}
