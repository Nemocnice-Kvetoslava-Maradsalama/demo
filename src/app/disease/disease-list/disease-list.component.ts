import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { DiseaseListDataSource } from './disease-list-datasource';
import { SymptomListDataSource } from './symptom-list-datasource';
import { LoadingService } from '../../loading.service';
import { DiseaseService } from 'src/app/disease.service';
import { Symptom } from 'src/app/types';

@Component({
  selector: 'app-disease-list',
  templateUrl: './disease-list.component.html',
  styleUrls: ['./disease-list.component.scss']
})
export class DiseaseListComponent implements AfterViewInit {
    @ViewChild(MatSort) sort: MatSort;
    diseaseDataSource: DiseaseListDataSource;
    symptomsDataSource: SymptomListDataSource;
    diseaseDisplayedColumns = ['id', 'name', 'icd10', 'description', 'symptoms', 'cures'];
    symptomsDisplayedColumns = ['id', 'name', 'description', 'diseaseSymptoms'];

    constructor (private diseaseService: DiseaseService, private loadingService: LoadingService) {}

    ngAfterViewInit () {
        setTimeout(() => {
            this.diseaseDataSource = new DiseaseListDataSource(this.sort, this.diseaseService, this.loadingService);
            this.symptomsDataSource = new SymptomListDataSource(this.sort, this.diseaseService, this.loadingService);
        });
    }

    public getSymptoms (symptoms: Symptom[]): string {
        if (!symptoms) return '';
        return symptoms.map((symptom) => symptom.name).join(', ');
    }
}
