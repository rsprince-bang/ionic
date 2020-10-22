import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWaterModalPage } from './add-water-modal.page';

describe('AddWaterModalPage', () => {
  let component: AddWaterModalPage;
  let fixture: ComponentFixture<AddWaterModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWaterModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWaterModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
