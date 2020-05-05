import { DataSource } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Observable, merge } from 'rxjs';
import { LoadingService } from '../../loading.service';
import { Disease } from 'src/app/types';
import { DiseaseService } from 'src/app/disease.service';

export class DiseaseListDataSource extends DataSource<Disease> {

    private unsetLoading: () => void;

    constructor (private sort: MatSort, private diseaseService: DiseaseService, private loadingService: LoadingService) {
        super();
    }

    connect (): Observable<Disease[]> {
        const displayDataChanges = [
            this.sort.sortChange
        ];
        return merge(...displayDataChanges).pipe(
            startWith(null),
            switchMap(() => {
                this.unsetLoading = this.loadingService.setLoading();
                return this.diseaseService.getDiseases();
            }),
            map((items: Disease[]) => {
                this.unsetLoading();
                return this.getSortedData(items);
            })
        );
    }

    disconnect() { }

    private getSortedData(data: Disease[]) {
        if (!this.sort.active || this.sort.direction === '') {
            return data;
        }
        return data.sort((a, b) => {
            const isAsc = this.sort.direction === 'asc';
            switch (this.sort.active) {
                case 'id': return this.compare(a.id, b.id, isAsc);
                case 'name': return this.compare(a.name, b.name, isAsc);
                case 'icd10': return this.compare(a.icd10, b.icd10, isAsc);
                case 'description': return this.compare(a.description, b.description, isAsc);
                case 'cures': return this.compare(a.cures, b.cures, isAsc);
                case 'symptoms': return this.compare(a.symptoms, b.symptoms, isAsc);
                default: return 0;
            }
        });
    }

    private compare (a: any, b: any, isAsc: boolean): number {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
}
