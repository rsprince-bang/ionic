import { TestBed } from '@angular/core/testing';
import { MovieService } from './movies.service';
describe('MoviesService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(MovieService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=movies.service.spec.js.map