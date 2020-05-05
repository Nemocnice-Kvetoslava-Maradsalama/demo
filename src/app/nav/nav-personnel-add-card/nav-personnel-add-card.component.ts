import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { PersonnelService } from '../../personnel.service';

@Component({
  selector: 'app-nav-personnel-add-card',
  templateUrl: './nav-personnel-add-card.component.html',
  styleUrls: ['./nav-personnel-add-card.component.scss']
})
export class NavPersonnelAddCardComponent implements OnInit {
    @Output() closeMenu: EventEmitter<void> = new EventEmitter<void>();
    public isLoading = false;
    public item: any;

    constructor (private router: Router, private personnelService: PersonnelService) {}

    ngOnInit () {
        this.resetItem();
    }
    private resetItem (): void {
        this.item = {
            id: '',
            name: ''
        };
    }

    public stopPropagation (event): void {
        event.stopPropagation();
    }

    public submit () {
        this.isLoading = true;
        this.personnelService.addDoctor(this.item).subscribe((itemId) => {
            this.navigateToItemEditPage(itemId);
            this.resetItem();
            this.closeMenu.emit();
            this.isLoading = false;
        })
    }
    private navigateToItemEditPage (itemId) {
        this.router.navigate(['/edit/' + itemId]);
    }
}