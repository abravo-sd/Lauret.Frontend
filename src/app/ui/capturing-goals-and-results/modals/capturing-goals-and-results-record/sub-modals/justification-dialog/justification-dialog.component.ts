import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-justification-dialog',
  templateUrl: './justification-dialog.component.html',
  styleUrls: ['./justification-dialog.component.scss'],
})
export class JustificationDialogComponent implements OnInit {
  constructor(private readonly ref: MatDialogRef<never>) {}

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
