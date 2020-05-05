import { DataSource } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Observable, merge } from 'rxjs';
import { PersonnelService } from 'src/app/personnel.service';
import { LoadingService } from '../../loading.service';
import { Account } from 'src/app/types';

export class AccountListDataSource extends DataSource<Account> {

    private unsetLoading: () => void;

    constructor (private sort: MatSort, private personnelService: PersonnelService, private loadingService: LoadingService) {
        super();
    }

    connect (): Observable<Account[]> {
        const displayDataChanges = [
            this.sort.sortChange
        ];
        return merge(...displayDataChanges).pipe(
            startWith(null),
            switchMap(() => {
                this.unsetLoading = this.loadingService.setLoading();
                return this.personnelService.getAccounts();
            }),
            map((items: Account[]) => {
                this.unsetLoading();
                return this.getSortedData(items);
            })
        );
    }

    disconnect() { }

    private getSortedData(data: Account[]) {
        if (!this.sort.active || this.sort.direction === '') {
            return data;
        }
        return data.sort((a, b) => {
            const isAsc = this.sort.direction === 'asc';
            switch (this.sort.active) {
                case 'id': return this.compare(a.id, b.id, isAsc);
                case 'username': return this.compare(a.username, b.username, isAsc);
                case 'email': return this.compare(a.email, b.email, isAsc);
                default: return 0;
            }
        });
    }

    private compare (a: any, b: any, isAsc: boolean): number {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
}