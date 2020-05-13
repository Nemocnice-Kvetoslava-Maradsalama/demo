import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { DiseaseListDataSource } from './disease-list-datasource';
import { SymptomListDataSource } from './symptom-list-datasource';
import { LoadingService } from '../../loading.service';
import { DiseaseService } from 'src/app/disease.service';
import { Symptom } from 'src/app/types';
import { MatMenuTrigger } from '@angular/material/menu';
import { ForeignMappingService } from 'src/app/foreign-mapping.service';

@Component({
  selector: 'app-disease-list',
  templateUrl: './disease-list.component.html',
  styleUrls: ['./disease-list.component.scss']
})
export class DiseaseListComponent implements AfterViewInit {
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
    diseaseDataSource: DiseaseListDataSource;
    symptomsDataSource: SymptomListDataSource;
    diseaseDisplayedColumns = ['id', 'name', 'icd10', 'description', 'symptoms', 'cures', 'addCure'];
    symptomsDisplayedColumns = ['id', 'name', 'description', 'diseaseSymptoms'];

    constructor (private diseaseService: DiseaseService, private loadingService: LoadingService, private foreignMappingService: ForeignMappingService) {}

    ngAfterViewInit () {
        setTimeout(() => {
            this.diseaseDataSource = new DiseaseListDataSource(this.sort, this.diseaseService, this.loadingService);
            this.symptomsDataSource = new SymptomListDataSource(this.sort, this.diseaseService, this.loadingService);
        });
    }

    public getSymptoms (symptoms: Symptom[]): string {
        if (!symptoms) {
            return '';
        }
        return symptoms.map((symptom) => symptom.name).join(', ');
    }

    public closeItemMenu () {
        this.trigger.closeMenu();
        this.diseaseDataSource = new DiseaseListDataSource(this.sort, this.diseaseService, this.loadingService);
    }

    public getCures (cures: string[]) {
        return cures && cures.map((cureId) => this.foreignMappingService.getDrugById(cureId)).join(', ');
    }
}
