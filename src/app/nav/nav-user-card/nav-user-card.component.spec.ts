import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavUserCardComponent } from './nav-user-card.component';

describe('NavUserCardComponent', () => {
  let component: NavUserCardComponent;
  let fixture: ComponentFixture<NavUserCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavUserCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
