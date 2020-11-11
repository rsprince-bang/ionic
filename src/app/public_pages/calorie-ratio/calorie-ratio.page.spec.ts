import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalorieRatioPage } from './calorie-ratio.page';

describe('CalorieRatioPage', () => {
  let component: CalorieRatioPage;
  let fixture: ComponentFixture<CalorieRatioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalorieRatioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalorieRatioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
