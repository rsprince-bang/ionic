import { TestBed } from '@angular/core/testing';
import { FoodSuggestionsService } from './food-suggestions.service';
describe('FoodSuggestionsService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(FoodSuggestionsService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=food-suggestions.service.spec.js.map