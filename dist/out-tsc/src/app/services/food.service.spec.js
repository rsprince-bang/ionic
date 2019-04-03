import { TestBed } from '@angular/core/testing';
import { FoodService } from './food.service';
describe('FoodService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(FoodService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=food.service.spec.js.map