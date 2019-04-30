import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhotoModalPage } from './add-photo-modal.page';

describe('AddPhotoModalPage', () => {
  let component: AddPhotoModalPage;
  let fixture: ComponentFixture<AddPhotoModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPhotoModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPhotoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
