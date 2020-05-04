import { Component } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { AuthService } from '../../auth.service';

@Component({
    selector: 'app-nav-user-card',
    templateUrl: './nav-user-card.component.html',
    styleUrls: ['./nav-user-card.component.scss']
})
export class NavUserCardComponent {

    constructor (private authService: AuthService, private mediaObserver: MediaObserver) {}

    public isUserAuthenticated () {
        return this.authService.isAuthenticated();
    }

    public login (): void {
        this.authService.login();
    }

    public logout (): void {
        this.authService.logout();
    }

    public getUser (): any {
        return this.authService.getUser();
    }

    public shouldShowCardText () {
        return !this.mediaObserver.isActive('xs');
    }

}