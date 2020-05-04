import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { PersonnelListComponent } from './personnel-list/personnel-list.component';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [PersonnelListComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    HttpClientModule,
    AppRoutingModule
  ]
})
export class PersonnelModule { }
