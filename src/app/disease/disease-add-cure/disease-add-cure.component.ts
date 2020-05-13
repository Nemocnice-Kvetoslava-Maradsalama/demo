import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CureForDisease } from 'src/app/types';
import { ForeignMappingService } from 'src/app/foreign-mapping.service';
import { DiseaseService } from 'src/app/disease.service';

@Component({
  selector: 'app-disease-add-cure',
  templateUrl: './disease-add-cure.component.html',
  styleUrls: ['./disease-add-cure.component.scss']
})
export class DiseaseAddCureComponent implements OnInit {
    @Output() closeMenu: EventEmitter<void> = new EventEmitter<void>();
    @Input() diseaseId: number;
    public isLoading = false;
    public cure: CureForDisease;

    constructor (private diseaseService: DiseaseService, private foreignMappingService: ForeignMappingService) {}

    ngOnInit () {
        this.resetItem();
    }
    private resetItem (): void {
        this.cure = {
            disease: this.diseaseId,
            cure: ''
        };
    }

    public getDrugs () {
        return this.foreignMappingService.getDrugsAsArray();
    }

    public stopPropagation (event): void {
        event.stopPropagation();
    }

    public submit () {
        this.isLoading = true;
        this.diseaseService.addCure(this.cure).subscribe((itemId) => {
            this.resetItem();
            this.closeMenu.emit();
            this.isLoading = false;
        }, (error) => {
            this.isLoading = false;
            this.resetItem();
            this.closeMenu.emit();
            console.error(error);
        })
    }
};