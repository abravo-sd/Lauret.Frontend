import { from, Observable } from 'rxjs';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

export interface AlertExtendedConfig extends AlertConfig {
  icon: SweetAlertIcon;
}

export interface AlertConfig {
  acceptText?: string;
  cancelText?: string;
  isHTML?: boolean;
  time?: number | null;
  showConfirmButton?: boolean;
}

export class Alert {
  private static CANCEL_TEXT = 'CANCELAR';
  private static ACCEPT_TEXT = 'ACEPTAR';

  static success(
    message: string,
    title: string = 'Guardado exitosamente',
    config?: AlertConfig
  ): Observable<SweetAlertResult> {
    return Alert.alert(title, message || '', {
      icon: 'success',
      acceptText: config ? config.acceptText || '' : '',
      cancelText: config ? config.cancelText || '' : '',
      isHTML: config ? config.isHTML || false : false,
      time: config ? config.time || null : null,
      showConfirmButton: config ? config.showConfirmButton : false,
    });
  }

  static error(message: string, title: string = 'Error', config?: AlertConfig): Observable<SweetAlertResult> {
    return Alert.alert(title, message || '', {
      icon: 'error',
      acceptText: config ? config.acceptText || '' : '',
      cancelText: config ? config.cancelText || '' : '',
      isHTML: config ? config.isHTML || false : false,
      time: config ? config.time || null : null,
      showConfirmButton: config ? config.showConfirmButton : false,
    });
  }

  static warn(message: string, title: string = 'Advertencia', config?: AlertConfig): Observable<SweetAlertResult> {
    return Alert.alert(title, message || '', {
      icon: 'warning',
      acceptText: config ? config.acceptText || '' : '',
      cancelText: config ? config.cancelText || '' : '',
      isHTML: config ? config.isHTML || false : false,
      time: config ? config.time || null : null,
      showConfirmButton: config ? config.showConfirmButton : false,
    });
  }

  static info(message: string, title: string = 'Información', config?: AlertConfig): Observable<SweetAlertResult> {
    return Alert.alert(title, message || '', {
      icon: 'info',
      acceptText: config ? config.acceptText || '' : '',
      cancelText: config ? config.cancelText || '' : '',
      isHTML: config ? config.isHTML || false : false,
      time: config ? config.time || null : null,
      showConfirmButton: config ? config.showConfirmButton : false,
    });
  }

  static confirm(title: string, message?: string, config?: AlertExtendedConfig): Observable<SweetAlertResult> {
    return from(
      Swal.fire({
        heightAuto: false,
        title,
        text: message || '',
        icon: config ? config.icon || 'warning' : 'warning',
        showCancelButton: true,
        confirmButtonColor: '#f44336',
        /* cancelButtonColor: '#F1C40F',
        customClass: { cancelButton: 'alert__btn-cancel' }, */
        confirmButtonText: config ? config.acceptText || Alert.ACCEPT_TEXT : Alert.ACCEPT_TEXT,
        cancelButtonText: config ? config.cancelText || Alert.CANCEL_TEXT : Alert.CANCEL_TEXT,
      })
    );
  }

  private static alert(title: string, message: string, config: AlertExtendedConfig): Observable<SweetAlertResult> {
    return from(
      Swal.fire({
        heightAuto: false,
        icon: config.icon,
        title,
        text: config.isHTML ? '' : message || '',
        html: config.isHTML ? message : '',
        showConfirmButton: config.showConfirmButton || false,
        confirmButtonText: config.acceptText || Alert.ACCEPT_TEXT,
        cancelButtonText: config.cancelText || Alert.CANCEL_TEXT,
        customClass: { cancelButton: 'alert__btn-cancel' },
        timer: config.showConfirmButton ? undefined : config.time !== null ? config.time : 4000,
      })
    );
  }

  static showPreviewModal(title: string, base64: string): void {
    const imageUrl = 'URL_DE_LA_IMAGEN'; // Reemplaza con la URL de la imagen
    const imageHtml = `<img src="${imageUrl}" alt="Vista previa">`; // Crear la etiqueta de imagen HTML

    Swal.fire({
      title: 'Vista previa de la imagen',
      html: imageHtml, // Pasar la etiqueta de imagen como contenido HTML
    });
  }
}
