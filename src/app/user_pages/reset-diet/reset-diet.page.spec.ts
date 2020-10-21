import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetDietPage } from './reset-diet.page';

describe('ResetDietPage', () => {
  let component: ResetDietPage;
  let fixture: ComponentFixture<ResetDietPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetDietPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetDietPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
