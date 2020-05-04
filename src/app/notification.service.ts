import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private alertMessage = '';

  public showTemporaryAlert(message: string): void {
    this.alertMessage = message;
    setTimeout(() => {
      this.alertMessage = '';
    });
  }

  public getAlertMessage(): string {
    return this.alertMessage;
  }

  public showAlert(message: string) {
    this.alertMessage = message;
    return () => {
      this.alertMessage = '';
    };
  }
}