import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSleepModalPage } from './add-sleep-modal.page';

describe('AddSleepModalPage', () => {
  let component: AddSleepModalPage;
  let fixture: ComponentFixture<AddSleepModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSleepModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSleepModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
