import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterMeasurementsPage } from './enter-measurements.page';

describe('EnterMeasurementsPage', () => {
  let component: EnterMeasurementsPage;
  let fixture: ComponentFixture<EnterMeasurementsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterMeasurementsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterMeasurementsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
