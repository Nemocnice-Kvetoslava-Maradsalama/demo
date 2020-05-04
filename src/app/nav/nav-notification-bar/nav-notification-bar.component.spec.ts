import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavNotificationBarComponent } from './nav-notification-bar.component';

describe('NavNotificationBarComponent', () => {
  let component: NavNotificationBarComponent;
  let fixture: ComponentFixture<NavNotificationBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavNotificationBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavNotificationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
