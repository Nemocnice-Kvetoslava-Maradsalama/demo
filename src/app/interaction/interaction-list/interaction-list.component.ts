import { Component, ViewChild, AfterViewInit, Input } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { InteractionListDataSource } from './interaction-list-datasource';
import { LoadingService } from '../../loading.service';
import { PatientService } from 'src/app/patient.service';

@Component({
  selector: 'app-interaction-list',
  templateUrl: './interaction-list.component.html',
  styleUrls: ['./interaction-list.component.scss']
})
export class InteractionListComponent implements AfterViewInit {
    @Input() patientId: number;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: InteractionListDataSource;
    displayedColumns = ['id', 'diagnosis', 'doctor', 'prescriptions', 'symptoms', 'note'];

    constructor (private patientService: PatientService, private loadingService: LoadingService) {}

    ngAfterViewInit () {
        setTimeout(() => {
            this.dataSource = new InteractionListDataSource(this.patientId, this.sort, this.patientService, this.loadingService);
        });
    }
}
