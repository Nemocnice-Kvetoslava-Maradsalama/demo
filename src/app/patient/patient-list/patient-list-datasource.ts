import { DataSource } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Observable, merge } from 'rxjs';
import { PatientService } from 'src/app/patient.service';
import { LoadingService } from '../../loading.service';
import { Patient } from 'src/app/types';

export class PatientListDataSource extends DataSource<Patient> {

    private unsetLoading: () => void;

    constructor (private sort: MatSort, private patientService: PatientService, private loadingService: LoadingService) {
        super();
    }

    connect (): Observable<Patient[]> {
        const displayDataChanges = [
            this.sort.sortChange
        ];
        return merge(...displayDataChanges).pipe(
            startWith(null),
            switchMap(() => {
                this.unsetLoading = this.loadingService.setLoading();
                return this.patientService.getPatients();
            }),
            map((items: Patient[]) => {
                this.unsetLoading();
                return this.getSortedData(items);
            })
        );
    }

    disconnect() { }

    private getSortedData(data: Patient[]) {
        if (!this.sort.active || this.sort.direction === '') {
            return data;
        }
        return data.sort((a, b) => {
            const isAsc = this.sort.direction === 'asc';
            switch (this.sort.active) {
                case 'id': return this.compare(a.id, b.id, isAsc);
                case 'address': return this.compare(a.address, b.address, isAsc);
                case 'firstName': return this.compare(a.firstName, b.firstName, isAsc);
                case 'lastName': return this.compare(a.lastName, b.lastName, isAsc);
                case 'note': return this.compare(a.note, b.note, isAsc);
                case 'personalNumber': return this.compare(a.personalNumber, b.personalNumber, isAsc);
                default: return 0;
            }
        });
    }

    private compare (a: any, b: any, isAsc: boolean): number {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
}