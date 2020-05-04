import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { PersonnelListDataSource } from './personnel-list-datasource';
import { PersonnelService } from '../../personnel.service';
import { LoadingService } from '../../loading.service';

@Component({
    selector: 'app-personnel-list',
    templateUrl: './personnel-list.component.html',
    styleUrls: ['./personnel-list.component.scss']
})
export class PersonnelListComponent implements AfterViewInit {
    @ViewChild(MatSort) sort: MatSort;
    dataSource: PersonnelListDataSource;
    displayedColumns = ['id', 'firstname', 'lastname', 'salary'];

    constructor (private personnelService: PersonnelService, private loadingService: LoadingService) {}

    ngAfterViewInit () {
        setTimeout(() => {
            this.dataSource = new PersonnelListDataSource(this.sort, this.personnelService, this.loadingService);
        });
    }
}