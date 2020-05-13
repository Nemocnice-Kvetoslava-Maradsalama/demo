import { Injectable } from '@angular/core';
import { PersonnelService } from './personnel.service';
import { Doctor, Symptom, Drug, Disease } from './types';
import { DiseaseService } from './disease.service';
import { DrugService } from './drug.service';

export interface DrugArrayItem {
  id: string;
  value: string;
};

@Injectable({
  providedIn: 'root'
})
export class ForeignMappingService {
  private doctors: string[];
  private symptoms: string[];
  private drugs: { [index: string]: string };
  private drugsArray: DrugArrayItem[];
  private diseases: string[];

  constructor (private personnelService: PersonnelService, private diseaseService: DiseaseService, private drugService: DrugService) {
    this.doctors = null;
    this.symptoms = null;
    this.drugs = null;
    this.drugsArray = null;
    this.diseases = null;
  }

  public getDoctors(): string[] {
    if (this.doctors == null) {
      this.doctors = [];
      this.fetchDoctors();
    }
    return this.doctors;
  }

  public getSymptoms(): string[] {
    if (this.symptoms == null) {
      this.symptoms = [];
      this.fetchSymptoms();
    }
    return this.symptoms;
  }

  public getDrugs(): { [index: string]: string } {
    if (this.drugs == null) {
      this.drugs = {};
      this.fetchDrugs();
    }
    return this.drugs;
  }

  public getDrugsAsArray (): DrugArrayItem[] {
    if (this.drugsArray == null) {
      const keys = Object.keys(this.getDrugs());
      if (keys.length == 0) return [];
      this.drugsArray = keys.map((drugId: string) => ({
        id: drugId,
        value: this.drugs[drugId]
      }));
    }
    return this.drugsArray;
  }

  public getDiseases(): string[] {
    if (this.diseases == null) {
      this.diseases = [];
      this.fetchDiseases();
    }
    return this.diseases;
  }

  public getDoctorById (doctorId: number): string {
    if (this.doctors == null) {
      this.doctors = [];
      this.fetchDoctors();
    }

    return this.doctors[doctorId] || doctorId + '';
  }

  private fetchDoctors (): void {
    this.personnelService.getDoctors().subscribe((doctors: Doctor | Doctor[]) => {
      if (Array.isArray(doctors)) {
        doctors.forEach((doctor: Doctor) => this.addDoctor(doctor));
      } else {
        this.addDoctor(doctors);
      }
    });
  }

  private addDoctor (doctor: Doctor): void {
    this.doctors[doctor.id] = doctor.firstname + ' ' + doctor.lastname;
  }

  public getSymptomById (symptomId: number): string {
    if (this.symptoms == null) {
      this.symptoms = [];
      this.fetchSymptoms();
    }

    return this.symptoms[symptomId] || symptomId + '';
  }

  private fetchSymptoms (): void {
    this.diseaseService.getSymptoms().subscribe((symptoms: Symptom | Symptom[]) => {
      if (Array.isArray(symptoms)) {
        symptoms.forEach((symptom: Symptom) => this.addSymptom(symptom));
      } else {
        this.addSymptom(symptoms);
      }
    });
  }

  private addSymptom (symptom: Symptom): void {
    this.symptoms[symptom.id] = symptom.name;
  }

  public getDrugById (drugId: string): string {
    if (this.drugs == null) {
      this.drugs = {};
      this.fetchDrugs();
    }

    return this.drugs[drugId] || drugId + '';
  }

  private fetchDrugs (): void {
    this.drugService.getDrugs().subscribe((drugs: Drug | Drug[]) => {
      if (Array.isArray(drugs)) {
        drugs.forEach((drug: Drug) => this.addDrug(drug));
      } else {
        this.addDrug(drugs);
      }
    });
  }

  private addDrug (drug: Drug): void {
    this.drugs[drug._id] = drug.name;
  }


  public getDiseaseById (diseaseId: number): string {
    if (this.diseases == null) {
      this.diseases = [];
      this.fetchDiseases();
    }

    return this.diseases[diseaseId] || diseaseId + '';
  }

  private fetchDiseases (): void {
    this.diseaseService.getDiseases().subscribe((diseases: Disease | Disease[]) => {
      if (Array.isArray(diseases)) {
        diseases.forEach((disease: Disease) => this.addDisease(disease));
      } else {
        this.addDisease(diseases);
      }
    });
  }

  private addDisease (disease: Disease): void {
    this.diseases[disease.id] = disease.name;
  }
}
