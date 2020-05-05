import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { DoctorListDataSource } from './doctor-list-datasource';
import { AccountListDataSource } from './account-list-datasource';
import { PersonnelService } from '../../personnel.service';
import { LoadingService } from '../../loading.service';

@Component({
    selector: 'app-personnel-list',
    templateUrl: './personnel-list.component.html',
    styleUrls: ['./personnel-list.component.scss']
})
export class PersonnelListComponent implements AfterViewInit {
    @ViewChild(MatSort) sort: MatSort;
    doctorsDataSource: DoctorListDataSource;
    accountsDataSource: AccountListDataSource;
    doctorsDisplayedColumns = ['id', 'firstname', 'lastname', 'salary', 'totalSalary'];
    accountsDisplayedColumns = ['id', 'username', 'email'];
    salaries: number[] = [];

    constructor (private personnelService: PersonnelService, private loadingService: LoadingService) {}

    ngAfterViewInit () {
        setTimeout(() => {
            this.doctorsDataSource = new DoctorListDataSource(this.sort, this.personnelService, this.loadingService);
            this.accountsDataSource = new AccountListDataSource(this.sort, this.personnelService, this.loadingService);
        });
    }

    public calculateSalary (doctorId: number) {
        this.personnelService.calculateSalary(doctorId).subscribe((salary) => {
            this.salaries[doctorId] = salary;
        });
    }
}