import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from '../app-routing.module';
import { NavLoadingBarComponent } from './nav-loading-bar/nav-loading-bar.component';
import { NavNotificationBarComponent } from './nav-notification-bar/nav-notification-bar.component';
import { NavUserCardComponent } from './nav-user-card/nav-user-card.component';

import { NavComponent } from './nav/nav.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';

@NgModule({
  declarations: [NavComponent, NavLoadingBarComponent, NavNotificationBarComponent, NavUserCardComponent, LoginDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    LayoutModule,
    NgbModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    AppRoutingModule,
  ],
  entryComponents: [LoginDialogComponent],
  exports: [NavComponent]
})
export class NavModule { }
