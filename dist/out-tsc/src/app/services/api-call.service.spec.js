import { TestBed } from '@angular/core/testing';
import { ApiCallService } from './api-call.service';
describe('ApiCallService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(ApiCallService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=api-call.service.spec.js.map