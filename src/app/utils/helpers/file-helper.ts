import { AbstractControl, FormControl } from '@angular/forms';
import { Alert } from './alert';

export class FileHelper {
  /**
   * Removes an error of FormControl
   *
   * @param control FormControl
   * @param error error for remove
   */
  static removeCtrlError(control: FormControl | AbstractControl, error: string): void {
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
    const invalid: File[] = [];
    const valid: File[] = [];
    files.forEach((file) => {
      const extFile = file.name.split('.').pop();
      if (ext.includes(file.type) || ext.indexOf(`.${extFile}`) !== -1) {
        valid.push(file);
      } else {
        invalid.push(file);
      }
    });
    return {
      invalid,
      valid,
    };
  }

  static getBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      let base64: string = null;
      if (!file) {
        resolve(base64);
      }

      const reader: FileReader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = function (error) {
        Alert.error('Error al cargar el archivo');
        // console.log('Error: ', error);
      };
    });
  }

  static convertBase64ToBlob(base64Data: string): Promise<Blob> {
    return new Promise<Blob>(async (resolve, reject) => {
      const base64 = await fetch(base64Data);
      const blob = await base64.blob();
      resolve(blob);
    });
  }

  static convertBase64ToFile(base64Data: string, fileName: string): Promise<Blob> {
    return new Promise<Blob>(async (resolve, reject) => {
      const base64 = await fetch(base64Data);
      const blob = await base64.blob();
      const file: File = new File([blob], fileName);
      resolve(file);
    });
  }

  static getSizeFileMBToBytes(sizeMB: number): number {
    const size: number = 1e6 * sizeMB;
    return size;
  }

  static getFileExtension(file: File): string {
    if (file.name.length === 0) {
      return null;
    }
    const extension = file.name.split('.').pop();
    return extension;
  }
}
