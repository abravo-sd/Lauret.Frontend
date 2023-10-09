import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CapituloDTO, CapituloDTOV1 } from 'src/app/utils/models';
import { ChapterRecordComponent } from './chapter-record.component';

@Injectable()
export class ChapterRecordService {
    constructor(private dialog: MatDialog) { }

    open(data: CapituloDTOV1): MatDialogRef<ChapterRecordComponent> {
        return this.dialog.open<ChapterRecordComponent>(ChapterRecordComponent, {
            data,
            disableClose: true,
        });
    }
}
