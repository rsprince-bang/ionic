import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAddWorkoutModalPage } from './home-add-workout-modal.page';

describe('HomeAddWorkoutModalPage', () => {
  let component: HomeAddWorkoutModalPage;
  let fixture: ComponentFixture<HomeAddWorkoutModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAddWorkoutModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAddWorkoutModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
