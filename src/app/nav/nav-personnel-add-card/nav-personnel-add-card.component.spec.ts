import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavPersonnelAddCardComponent } from './nav-personnel-add-card.component';

describe('NavPersonnelAddCardComponent', () => {
  let component: NavPersonnelAddCardComponent;
  let fixture: ComponentFixture<NavPersonnelAddCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavPersonnelAddCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavPersonnelAddCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
