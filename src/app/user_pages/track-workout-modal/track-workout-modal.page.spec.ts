import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackWorkoutModalPage } from './track-workout-modal.page';

describe('TrackWorkoutModalPage', () => {
  let component: TrackWorkoutModalPage;
  let fixture: ComponentFixture<TrackWorkoutModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackWorkoutModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackWorkoutModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
