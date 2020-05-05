import { DataSource } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Observable, merge } from 'rxjs';
import { PersonnelService } from 'src/app/personnel.service';
import { LoadingService } from '../../loading.service';
import { Doctor } from 'src/app/types';

export class DoctorListDataSource extends DataSource<Doctor> {

    private unsetLoading: () => void;

    constructor (private sort: MatSort, private personnelService: PersonnelService, private loadingService: LoadingService) {
        super();
    }

    connect (): Observable<Doctor[]> {
        const displayDataChanges = [
            this.sort.sortChange
        ];
        return merge(...displayDataChanges).pipe(
            startWith(null),
            switchMap(() => {
                this.unsetLoading = this.loadingService.setLoading();
                return this.personnelService.getDoctors();
            }),
            map((items: Doctor[]) => {
                this.unsetLoading();
                return this.getSortedData(items);
            })
        );
    }

    disconnect() { }

    private getSortedData(data: Doctor[]) {
        if (!this.sort.active || this.sort.direction === '') {
            return data;
        }
        return data.sort((a, b) => {
            const isAsc = this.sort.direction === 'asc';
            switch (this.sort.active) {
                case 'id': return this.compare(a.id, b.id, isAsc);
                case 'firstname': return this.compare(a.firstname, b.firstname, isAsc);
                case 'lastname': return this.compare(a.lastname, b.lastname, isAsc);
                case 'salary': return this.compare(a.salary, b.salary, isAsc);
                default: return 0;
            }
        });
    }

    private compare (a: any, b: any, isAsc: boolean): number {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
}