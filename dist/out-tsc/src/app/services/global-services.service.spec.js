import { TestBed } from '@angular/core/testing';
import { GlobalServicesService } from './global-services.service';
describe('GlobalServicesService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(GlobalServicesService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=global-services.service.spec.js.map