import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAddFoodModalPage } from './home-add-food-modal.page';

describe('HomeAddFoodModalPage', () => {
  let component: HomeAddFoodModalPage;
  let fixture: ComponentFixture<HomeAddFoodModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAddFoodModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAddFoodModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
