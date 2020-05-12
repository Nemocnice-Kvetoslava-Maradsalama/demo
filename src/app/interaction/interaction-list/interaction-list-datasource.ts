import { DataSource } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Observable, merge } from 'rxjs';
import { LoadingService } from '../../loading.service';
import { Interaction } from 'src/app/types';
import { PatientService } from 'src/app/patient.service';

export class InteractionListDataSource extends DataSource<Interaction> {

    private unsetLoading: () => void;

    constructor (private patientId: number, private sort: MatSort, private patientService: PatientService, private loadingService: LoadingService) {
        super();
    }

    connect (): Observable<Interaction[]> {
        const displayDataChanges = [
            this.sort.sortChange
        ];
        return merge(...displayDataChanges).pipe(
            startWith(null),
            switchMap(() => {
                this.unsetLoading = this.loadingService.setLoading();
                return this.patientService.getInteractions(this.patientId);
            }),
            map((items: Interaction[]) => {
                this.unsetLoading();
                return this.getSortedData(items);
            })
        );
    }

    disconnect() { }

    private getSortedData(data: Interaction[]) {
        if (!this.sort.active || this.sort.direction === '') {
            return data;
        }
        return data.sort((a, b) => {
            const isAsc = this.sort.direction === 'asc';
            switch (this.sort.active) {
                case 'id': return this.compare(a.id, b.id, isAsc);
                case 'doctor': return this.compare(a.doctor, b.doctor, isAsc);
                case 'diagnosis': return this.compare(a.diagnosis, b.diagnosis, isAsc);
                case 'note': return this.compare(a.note, b.note, isAsc);
                case 'prescriptions': return this.compare(a.prescriptions, b.prescriptions, isAsc);
                case 'symptoms': return this.compare(a.symptoms, b.symptoms, isAsc);
                default: return 0;
            }
        });
    }

    private compare (a: any, b: any, isAsc: boolean): number {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
}
