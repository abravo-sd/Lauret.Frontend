import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-format-upload',
  templateUrl: './format-upload.component.html',
  styleUrls: ['./format-upload.component.scss'],
})
export class FormatUploadComponent {
  // TODO: Agregar el tipado y la lógica correspondiente
  dataSource: MatTableDataSource<any>;
  disabled: boolean;
  permission: boolean;
  constructor() {
    this.dataSource = new MatTableDataSource<any>([]);
    this.disabled = null;
    this.permission = null;
  }
}
