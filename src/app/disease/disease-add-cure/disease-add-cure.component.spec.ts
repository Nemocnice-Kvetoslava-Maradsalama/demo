import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseAddCureComponent } from './disease-add-cure.component';

describe('InteractionAddCardComponent', () => {
  let component: DiseaseAddCureComponent;
  let fixture: ComponentFixture<DiseaseAddCureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseaseAddCureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseAddCureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
