import { DataSource } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Observable, merge } from 'rxjs';
import { DrugService } from 'src/app/drug.service';
import { LoadingService } from '../../loading.service';
import { Drug } from 'src/app/types';

export class DrugListDataSource extends DataSource<Drug> {

    private unsetLoading: () => void;

    constructor (private sort: MatSort, private drugService: DrugService, private loadingService: LoadingService) {
        super();
    }

    connect (): Observable<Drug[]> {
        const displayDataChanges = [
            this.sort.sortChange
        ];
        return merge(...displayDataChanges).pipe(
            startWith(null),
            switchMap(() => {
                this.unsetLoading = this.loadingService.setLoading();
                return this.drugService.getDrugs();
            }),
            map((items: Drug[]) => {
                this.unsetLoading();
                return this.getSortedData(items);
            })
        );
    }

    disconnect() { }

    private getSortedData(data: Drug[]) {
        if (!this.sort.active || this.sort.direction === '') {
            return data;
        }
        return data.sort((a, b) => {
            const isAsc = this.sort.direction === 'asc';
            switch (this.sort.active) {
                case '_id': return this.compare(a._id, b._id, isAsc);
                case 'name': return this.compare(a.name, b.name, isAsc);
                case 'available': return this.compare(a.available, b.available, isAsc);
                case 'amount': return this.compare(a.amount, b.amount, isAsc);
                default: return 0;
            }
        });
    }

    private compare (a: any, b: any, isAsc: boolean): number {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
}
