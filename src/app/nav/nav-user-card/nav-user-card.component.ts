import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
    selector: 'app-nav-user-card',
    templateUrl: './nav-user-card.component.html',
    styleUrls: ['./nav-user-card.component.scss']
})
export class NavUserCardComponent {

    constructor (private authService: AuthService) {}

    public isUserAuthenticated () {
        return this.authService.isAuthenticated();
    }

    public login (): void {
        this.authService.login();
    }

    public logout (): void {
        this.authService.logout();
    }

    public getUsername (): any {
        return this.authService.getUsername();
    }
}