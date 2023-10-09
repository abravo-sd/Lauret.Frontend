import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FiltersModal, RegistroEvidencia } from 'src/app/utils/models';
import { EvidenceLogRecordComponent } from './evidence-log-record.component';

export interface EvidenceLogDataRecord {
  evidence: RegistroEvidencia;
  filters: FiltersModal;
  permissionUpload: boolean;
  permissionValid: boolean;
}

@Injectable()
export class EvidenceLogRecordService {
  constructor(private dialog: MatDialog) {}

  open(data: EvidenceLogDataRecord): MatDialogRef<EvidenceLogRecordComponent> {
    return this.dialog.open<EvidenceLogRecordComponent>(EvidenceLogRecordComponent, {
      autoFocus: false,
      data: data || null,
    });
  }
}
