import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { DrugListDataSource } from './drug-list-datasource';
import { LoadingService } from '../../loading.service';
import { DrugService } from 'src/app/drug.service';

@Component({
  selector: 'app-drug-list',
  templateUrl: './drug-list.component.html',
  styleUrls: ['./drug-list.component.scss']
})
export class DrugListComponent implements AfterViewInit {
    @ViewChild(MatSort) sort: MatSort;
    dataSource: DrugListDataSource;
    displayedColumns = ['_id', 'name', 'available', 'amount'];

    constructor (private drugService: DrugService, private loadingService: LoadingService) {}

    ngAfterViewInit () {
        setTimeout(() => {
            this.dataSource = new DrugListDataSource(this.sort, this.drugService, this.loadingService);
        });
    }
}
