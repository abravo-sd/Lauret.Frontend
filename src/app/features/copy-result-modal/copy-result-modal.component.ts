import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CopiadoResult } from 'src/app/utils/models';

@Component({
  selector: 'app-copy-result-modal',
  templateUrl: './copy-result-modal.component.html',
  styleUrls: ['./copy-result-modal.component.scss'],
})
export class CopyResultModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: CopiadoResult) {}
}
