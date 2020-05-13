import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { DoctorListDataSource } from './doctor-list-datasource';
import { AccountListDataSource } from './account-list-datasource';
import { PersonnelService } from '../../personnel.service';
import { LoadingService } from '../../loading.service';
import { AuthService } from 'src/app/auth.service';
import { SalaryService } from 'src/app/salary.service';

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
    private unsetLoading: () => void;

    constructor (private personnelService: PersonnelService, private loadingService: LoadingService, private authService: AuthService, private salaryService: SalaryService) {}

    ngAfterViewInit () {
        setTimeout(() => {
            this.doctorsDataSource = new DoctorListDataSource(this.sort, this.personnelService, this.loadingService);
            this.accountsDataSource = new AccountListDataSource(this.sort, this.personnelService, this.loadingService);
        });
    }

    public calculateSalary (doctorId: number) {
        this.unsetLoading = this.loadingService.setLoading();
        this.salaryService.calculateSalary(doctorId).subscribe((salary) => {
            this.unsetLoading();
            this.salaries[doctorId] = salary;
        }, (error) => {
            this.unsetLoading();
        });
    }

    public canCalculateSalary (doctorId: number) {
        return !this.salaries[doctorId] && this.authService.isAuthenticated();
    }
}