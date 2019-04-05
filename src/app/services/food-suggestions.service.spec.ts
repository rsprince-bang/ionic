import { TestBed } from '@angular/core/testing';

import { FoodSuggestionsService } from './food-suggestions.service';

describe('FoodSuggestionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FoodSuggestionsService = TestBed.get(FoodSuggestionsService);
    expect(service).toBeTruthy();
  });
});
