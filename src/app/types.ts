export interface Account {
    id: number;
    username: string;
    email: string;
}

export interface Doctor {
    id: number;
    firstname: string;
    lastname: string;
    salary: number;
}

export interface Patient {
    address: string;
    firstName: string;
    id: number;
    lastName: string;
    note: string;
    personalNumber: string;
}

export interface Disease {
    cures: number[];
    description: string;
    icd10: string;
    id: number;
    name: string;
    symptoms: Symptom[];
}

export interface Symptom {
    description: string;
    diseaseSymptoms: number[];
    id: number;
    name: string;
}

export interface LoginData {
    access_token: string;
    expires_in: number;
}

export interface Drug {
    _id: string;
    name: string;
    available: boolean;
    amount: string;
}