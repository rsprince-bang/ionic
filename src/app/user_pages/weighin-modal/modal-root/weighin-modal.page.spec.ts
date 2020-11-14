import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeighinModalPage } from './weighin-modal.page';

describe('WeighinModalPage', () => {
  let component: WeighinModalPage;
  let fixture: ComponentFixture<WeighinModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeighinModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeighinModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
