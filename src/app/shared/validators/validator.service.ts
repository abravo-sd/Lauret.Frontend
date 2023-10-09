import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  constructor() {}

  noWhitespace(control: UntypedFormControl) {
    const isWhitespace = !!(control.value || '').trim && (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { noWhitespace: true };
  }
}
