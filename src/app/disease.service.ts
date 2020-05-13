import { Injectable } from '@angular/core';
import { Observable, combineLatest, throwError } from 'rxjs';
import { catchError, retry, filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Patient, Disease, Symptom, Drug, CureForDisease } from 'src/app/types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DiseaseService {
  private url: string = environment.serviceUrls.disease;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHttpOptions () {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.authService.getToken()
      })
    };
  }

  public getDiseases(): Observable<Disease | Disease[]> {
    return this.http.get<Disease[]>(this.url + '/disease/', this.getHttpOptions())
      .pipe(
        catchError(this.handleError),
        map((diseases: Disease[]) => {
          return diseases.filter((disease: Disease) => !!disease.id);
        })
      );
  }

  public getSymptoms(): Observable<Symptom | Symptom[]> {
    return this.http.get<Symptom[]>(this.url + '/symptom/', this.getHttpOptions())
      .pipe(
        catchError(this.handleError),
        map((symptoms: Symptom[]) => {
          return symptoms.filter((symptom: Symptom) => !!symptom.id);
        })
      );
  }

  public addCure (cure: CureForDisease) {
    return this.http.post<CureForDisease>(this.url + '/disease/addCure/', cure, this.getHttpOptions())
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
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
