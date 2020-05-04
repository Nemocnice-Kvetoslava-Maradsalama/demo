import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { PersonnelService } from '../../personnel.service';
//import { BeerBase } from '../../app.types';

@Component({
  selector: 'app-nav-personnel-add-card',
  templateUrl: './nav-personnel-add-card.component.html',
  styleUrls: ['./nav-personnel-add-card.component.scss']
})
export class NavPersonnelAddCardComponent implements OnInit {
    @Output() closeMenu: EventEmitter<void> = new EventEmitter<void>();
    public isLoading = false;
    public beer: any;//BeerBase;

    constructor (private router: Router, private personnelService: PersonnelService) {}

    ngOnInit () {
        this.resetBeer();
    }
    private resetBeer (): void {
        this.beer = {
            id: '',
            name: ''
        };
    }

    public stopPropagation (event): void {
        event.stopPropagation();
    }

    public submit () {
        this.isLoading = true;
        this.personnelService.addDoctor(this.beer).subscribe((beerId) => {
            this.navigateToBeerEditPage(beerId);
            this.resetBeer();
            this.closeMenu.emit();
            this.isLoading = false;
        })
    }
    private navigateToBeerEditPage (beerId) {
        this.router.navigate(['/edit/' + beerId]);
    }
}