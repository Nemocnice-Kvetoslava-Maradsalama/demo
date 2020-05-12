import { Injectable } from '@angular/core';
import { Observable, combineLatest, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Patient, Interaction } from 'src/app/types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private url: string = environment.serviceUrls.patient;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHttpOptions () {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.authService.getToken()
      })
    };
  }

  /*public addDoctor(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(this.url + '/doctors', doctor, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getDoctors(): Observable<Doctor | Doctor[]> {
    return this.http.get<Doctor>(this.url + '/doctors', httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }*/

  public getPatients(): Observable<Patient | Patient[]> {
    return this.http.get<Patient>(this.url + '/patient/list', this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  public getInteractions (patientId: number): Observable<Interaction | Interaction[]> {
    return this.http.get<Interaction>(this.url + '/patient/' + patientId + '/interactions', this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.message}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
