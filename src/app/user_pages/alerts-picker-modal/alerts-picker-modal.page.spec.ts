import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsPickerModalPage } from './alerts-picker-modal.page';

describe('AlertsPickerModalPage', () => {
  let component: AlertsPickerModalPage;
  let fixture: ComponentFixture<AlertsPickerModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertsPickerModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsPickerModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
