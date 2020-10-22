import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVideo } from './view-video';

describe('SelectModal', () => {
  let component: ViewVideo;
  let fixture: ComponentFixture<ViewVideo>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewVideo ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVideo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});