import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { InteractionWithPatient } from 'src/app/types';
import { PatientService } from 'src/app/patient.service';
import { ForeignMappingService } from 'src/app/foreign-mapping.service';

@Component({
  selector: 'app-interaction-add-card',
  templateUrl: './interaction-add-card.component.html',
  styleUrls: ['./interaction-add-card.component.scss']
})
export class InteractionAddCardComponent implements OnInit {
    @Output() closeMenu: EventEmitter<void> = new EventEmitter<void>();
    @Input() patientId: number;
    public isLoading = false;
    public item: InteractionWithPatient;

    constructor (private patientService: PatientService, private foreignMappingService: ForeignMappingService) {}

    ngOnInit () {
        this.resetItem();
    }
    private resetItem (): void {
        this.item = {
            doctor: 0,
            note: '',
            diagnosis: undefined,
            prescriptions: undefined,
            symptoms: undefined,
            patient: {
                id: this.patientId
            }
        };
    }

    public getDrugs () {
        return this.foreignMappingService.getDrugsAsArray();
    }
    public getDiseases () {
        return this.foreignMappingService.getDiseases();
    }
    public getSymptoms () {
        return this.foreignMappingService.getSymptoms();
    }
    public getDoctors () {
        return this.foreignMappingService.getDoctors();
    }

    public stopPropagation (event): void {
        event.stopPropagation();
    }

    public submit () {
        this.isLoading = true;
        this.patientService.addInteraction(this.item).subscribe((itemId) => {
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