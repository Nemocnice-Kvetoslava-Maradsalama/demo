import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavLoadingBarComponent } from './nav-loading-bar.component';

describe('NavLoadingBarComponent', () => {
  let component: NavLoadingBarComponent;
  let fixture: ComponentFixture<NavLoadingBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavLoadingBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavLoadingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
