import { Component } from '@angular/core';
import { LoadingService } from '../../loading.service';

@Component({
    selector: 'app-nav-loading-bar',
    templateUrl: './nav-loading-bar.component.html',
    styleUrls: ['./nav-loading-bar.component.scss']
})
export class NavLoadingBarComponent {

    constructor (private loadingService: LoadingService) {}

    public shouldShowLoading (): boolean {
        return this.loadingService.shouldShowLoading();
    }
}