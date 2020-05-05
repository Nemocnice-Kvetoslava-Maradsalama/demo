import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { PatientListDataSource } from './patient-list-datasource';
import { LoadingService } from '../../loading.service';
import { PatientService } from 'src/app/patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements AfterViewInit {
    @ViewChild(MatSort) sort: MatSort;
    dataSource: PatientListDataSource;
    displayedColumns = ['id', 'firstName', 'lastName', 'address', 'note', 'personalNumber'];

    constructor (private patientService: PatientService, private loadingService: LoadingService) {}

    ngAfterViewInit () {
        setTimeout(() => {
            this.dataSource = new PatientListDataSource(this.sort, this.patientService, this.loadingService);
        });
    }
}
