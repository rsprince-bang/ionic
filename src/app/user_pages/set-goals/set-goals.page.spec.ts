import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetGoalsPage } from './set-goals.page';

describe('SetGoalsPage', () => {
  let component: SetGoalsPage;
  let fixture: ComponentFixture<SetGoalsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetGoalsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetGoalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
