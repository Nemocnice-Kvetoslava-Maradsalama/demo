import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { PersonnelListComponent } from './personnel/personnel-list/personnel-list.component';
import { PatientListComponent } from './patient/patient-list/patient-list.component';
import { DiseaseListComponent } from './disease/disease-list/disease-list.component';
import { DrugListComponent } from './drug/drug-list/drug-list.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'personnel', component: PersonnelListComponent },
  { path: 'patients', component: PatientListComponent },
  { path: 'diseases', component: DiseaseListComponent },
  { path: 'drugs', component: DrugListComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
