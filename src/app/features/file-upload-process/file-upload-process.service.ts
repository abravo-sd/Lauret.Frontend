import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CargaArchivoResult } from 'src/app/utils/models';
import { FileUploadProcessComponent } from './file-upload-process.component';

@Injectable()
export class FileUploadProcessService {
  constructor(private dialog: MatDialog) {}

  open(data: CargaArchivoResult): MatDialogRef<FileUploadProcessComponent, CargaArchivoResult> {
    return this.dialog.open<FileUploadProcessComponent>(FileUploadProcessComponent, {
      data,
      disableClose: true,
    });
  }
}
