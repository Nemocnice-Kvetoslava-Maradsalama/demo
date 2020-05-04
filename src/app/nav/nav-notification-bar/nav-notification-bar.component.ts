import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../notification.service';

@Component({
  selector: 'app-nav-notification-bar',
  templateUrl: './nav-notification-bar.component.html',
  styleUrls: ['./nav-notification-bar.component.scss']
})
export class NavNotificationBarComponent {

  constructor(private notificationService: NotificationService) { }

  public getAlertMessage(): string {
    return this.notificationService.getAlertMessage();
  }
}