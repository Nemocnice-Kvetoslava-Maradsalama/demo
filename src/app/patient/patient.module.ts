import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { PatientListComponent } from './patient-list/patient-list.component';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { InteractionModule } from '../interaction/interaction.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [PatientListComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    HttpClientModule,
    AppRoutingModule,
    InteractionModule,
  ]
})
export class PatientModule { }
