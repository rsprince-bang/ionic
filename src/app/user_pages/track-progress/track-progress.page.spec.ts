import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackProgressPage } from './track-progress.page';

describe('TrackProgressPage', () => {
  let component: TrackProgressPage;
  let fixture: ComponentFixture<TrackProgressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackProgressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackProgressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
