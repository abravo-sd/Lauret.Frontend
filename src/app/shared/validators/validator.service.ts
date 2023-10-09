import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  constructor() {}

  noWhitespace(control: FormControl) {
    const isWhitespace = !!(control.value || '').trim && (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { noWhitespace: true };
  }
}
