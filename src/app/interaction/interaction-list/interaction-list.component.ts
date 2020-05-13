import { Component, ViewChild, AfterViewInit, Input } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { InteractionListDataSource } from './interaction-list-datasource';
import { LoadingService } from '../../loading.service';
import { PatientService } from 'src/app/patient.service';
import { AuthService } from 'src/app/auth.service';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-interaction-list',
  templateUrl: './interaction-list.component.html',
  styleUrls: ['./interaction-list.component.scss']
})
export class InteractionListComponent implements AfterViewInit {
    @Input() patientId: number;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
    dataSource: InteractionListDataSource;
    displayedColumns = ['id', 'diagnosis', 'doctor', 'prescriptions', 'symptoms', 'note'];

    constructor (private patientService: PatientService, private loadingService: LoadingService, private authService: AuthService) {}

    ngAfterViewInit () {
        setTimeout(() => {
            this.dataSource = new InteractionListDataSource(this.patientId, this.sort, this.patientService, this.loadingService);
        });
    }
    public isUserAuthenticated (): boolean {
        return this.authService.isAuthenticated();
    }

    public closeItemMenu () {
        this.trigger.closeMenu();
        this.dataSource = new InteractionListDataSource(this.patientId, this.sort, this.patientService, this.loadingService);
    }
}
