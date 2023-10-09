import { AbstractControl, UntypedFormControl } from '@angular/forms';

export class Utils {
  /**
   * Removes an error of FormControl
   *
   * @param control FormControl
   * @param error error for remove
   */
  static removeCtrlError(control: UntypedFormControl | AbstractControl, error: string): void {
    const errors = control.errors;
    if (!errors) {
      return;
    }
    delete errors[error];
    if (Object.keys(errors).length === 0) {
      control.setErrors(null);
    } else {
      control.setErrors(errors);
    }
  }

  /**
   * Check the extension of a list of files
   *
   * @param files - File list
   * @param ext - Extension file list - e.g. ['.jpg', '.png', '.jpeg']
   * @returns Object with valid and invalid files
   */
  static checkExtFiles(files: File[], ext: string[]): { valid: File[]; invalid: File[] } {
    const invalid: any = [];
    const valid: any = [];
    files.forEach((file) => {
      const extFile = file.name.split('.').pop();
      if (ext.indexOf(`.${extFile}`) === -1) {
        invalid.push(file);
      } else {
        valid.push(file);
      }
    });
    return {
      invalid,
      valid,
    };
  }
}
