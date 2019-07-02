import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackMealPage } from './track-meal.page';

describe('TrackMealPage', () => {
  let component: TrackMealPage;
  let fixture: ComponentFixture<TrackMealPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackMealPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackMealPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});




