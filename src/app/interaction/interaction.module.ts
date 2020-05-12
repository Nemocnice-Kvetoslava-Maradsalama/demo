import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { InteractionListComponent } from './interaction-list/interaction-list.component';

@NgModule({
  declarations: [InteractionListComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    HttpClientModule,
    AppRoutingModule
  ],
  entryComponents: [InteractionListComponent],
  exports: [InteractionListComponent]
})
export class InteractionModule { }
