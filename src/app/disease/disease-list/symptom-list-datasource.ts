import { DataSource } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Observable, merge } from 'rxjs';
import { LoadingService } from '../../loading.service';
import { Patient, Disease, Symptom } from 'src/app/types';
import { DiseaseService } from 'src/app/disease.service';

export class SymptomListDataSource extends DataSource<Symptom> {

    private unsetLoading: () => void;

    constructor (private sort: MatSort, private diseaseService: DiseaseService, private loadingService: LoadingService) {
        super();
    }

    connect (): Observable<Symptom[]> {
        const displayDataChanges = [
            this.sort.sortChange
        ];
        return merge(...displayDataChanges).pipe(
            startWith(null),
            switchMap(() => {
                this.unsetLoading = this.loadingService.setLoading();
                return this.diseaseService.getSymptoms();
            }),
            map((items: Symptom[]) => {
                this.unsetLoading();
                return this.getSortedData(items);
            })
        );
    }

    disconnect() { }

    private getSortedData(data: Symptom[]) {
        if (!this.sort.active || this.sort.direction === '') {
            return data;
        }
        return data.sort((a, b) => {
            const isAsc = this.sort.direction === 'asc';
            switch (this.sort.active) {
                case 'id': return this.compare(a.id, b.id, isAsc);
                case 'name': return this.compare(a.name, b.name, isAsc);
                case 'description': return this.compare(a.description, b.description, isAsc);
                case 'diseaseSymptoms': return this.compare(a.diseaseSymptoms, b.diseaseSymptoms, isAsc);
                default: return 0;
            }
        });
    }

    private compare (a: any, b: any, isAsc: boolean): number {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
}
