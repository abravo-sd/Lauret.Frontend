import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/core/services';
import { ModalTitle } from '../indicators/modals/indicator-record/indicator-record.component';

@Component({
  selector: 'app-copy-process',
  templateUrl: './copy-process.component.html',
  styleUrls: ['./copy-process.component.scss'],
})
export class CopyProcessComponent implements OnInit {
  copyProcessForm: UntypedFormGroup;
  title: ModalTitle;
  edit: boolean;
  subscription: Subscription;
  disabled: boolean;
  permission: boolean;
  yearList: number[];
  cycleList: string[];

  constructor(private readonly formBuilder: UntypedFormBuilder, private users: UsersService) {
    this.title = ModalTitle.NEW;
    this.edit = null;
    this.disabled = null;
    this.permission = null;
    this.yearList = [];
    this.cycleList = [];
    this.subscription = new Subscription();
    this.copyProcessForm = this.formBuilder.group({
      anioOrigen: [null, [Validators.required]],
      cicloOrigen: [null, [Validators.required]],
      anioDestino: [null, [Validators.required]],
      cicloDestino: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.trackingStatusForm();
  }

  private trackingStatusForm(): void {
    this.subscription.add(this.copyProcessForm.statusChanges.subscribe(() => (this.edit = true)));
  }
}
