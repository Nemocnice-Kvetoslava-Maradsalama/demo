import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Account, LoginData } from './types';
import { LoginDialogComponent, DialogData } from './nav/login-dialog/login-dialog.component';
import { PersonnelService } from './personnel.service';
import { switchMap } from 'rxjs/operators';
import { LoadingService } from './loading.service';



@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token: string;
    private expiresIn: number;
    private username: string;
    private unsetLoading: () => void;

    constructor(public dialog: MatDialog, private personnelService: PersonnelService, private loadingService: LoadingService) {
        const token = localStorage.getItem('token');
        if (token) {
            this.token = token;
            this.username = localStorage.getItem('username');
        }
    }

    public isAuthenticated(): boolean {
        return !!this.token;
    }

    public login(): void {
        const dialogRef = this.dialog.open(LoginDialogComponent, {
            width: '250px',
            data: { username: '', password: '' }
        });

        let username = '';
        dialogRef.afterClosed().pipe(
            switchMap((data: DialogData) => {
                username = data.username;
                this.unsetLoading = this.loadingService.setLoading();
                return this.personnelService.login(data.username, data.password);
            })
        ).subscribe((result: LoginData) => {
            this.unsetLoading();
            this.token = result.access_token;
            this.expiresIn = result.expires_in;
            this.username = username;
            localStorage.setItem('token', result.access_token);
            localStorage.setItem('username', username);
        }, (error) => {
            this.unsetLoading();
        });
    }

    public logout(): void {
        this.token = null;
        this.expiresIn = 0;
        this.username = '';
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    }

    public getUsername(): string {
        return this.username;
    }

    public getToken(): string {
        return this.token;
    }
}