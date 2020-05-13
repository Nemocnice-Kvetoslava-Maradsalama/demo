import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { PersonnelListComponent } from './personnel-list/personnel-list.component';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [PersonnelListComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatTabsModule,
    MatSortModule,
    MatButtonModule,
    HttpClientModule,
    AppRoutingModule
  ]
})
export class PersonnelModule { }
