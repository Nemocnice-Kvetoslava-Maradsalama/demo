import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { MatMenuTrigger } from '@angular/material/menu';
import { AuthService } from '../../auth.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent {
    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
    isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

    constructor (private breakpointObserver: BreakpointObserver, private authService: AuthService) {}

    closeItemMenu () {
        this.trigger.closeMenu();
    }

    public isUserAuthenticated (): boolean {
        return this.authService.isAuthenticated();
    }
}