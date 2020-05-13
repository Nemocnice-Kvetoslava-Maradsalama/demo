import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionAddCardComponent } from './interaction-add-card.component';

describe('InteractionAddCardComponent', () => {
  let component: InteractionAddCardComponent;
  let fixture: ComponentFixture<InteractionAddCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractionAddCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractionAddCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
