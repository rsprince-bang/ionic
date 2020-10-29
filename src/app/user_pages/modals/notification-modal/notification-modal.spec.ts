import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationModal } from './notification-modal';

describe('SelectModal', () => {
  let component: NotificationModal;
  let fixture: ComponentFixture<NotificationModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationModal ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
