import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DiseaseListComponent } from './disease-list/disease-list.component';

@NgModule({
  declarations: [DiseaseListComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatTabsModule,
    MatSortModule,
    HttpClientModule,
    AppRoutingModule
  ]
})
export class DiseaseModule { }
