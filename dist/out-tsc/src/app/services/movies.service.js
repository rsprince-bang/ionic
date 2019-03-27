import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
export var SearchType;
(function (SearchType) {
    SearchType["all"] = "";
    SearchType["movie"] = "movie";
    SearchType["series"] = "series";
    SearchType["episode"] = "episode";
})(SearchType || (SearchType = {}));
var MovieService = /** @class */ (function () {
    function MovieService(http) {
        this.http = http;
        this.url = "http://www.omdbapi.com/?apikey=ef8b3047";
    }
    MovieService.prototype.searchData = function (title, type) {
        return this.http.get(this.url + "&s=" + encodeURI(title) + "&type=" + type)
            .pipe(map(function (results) {
            //console.log(results);
            return results['Search'];
        }));
    };
    MovieService.prototype.getDetails = function (id) {
        //console.log(`${this.url}&i=${id}&plot=full`);
        return this.http.get(this.url + "&i=" + id + "&plot=full");
    };
    MovieService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], MovieService);
    return MovieService;
}());
export { MovieService };
//# sourceMappingURL=movies.service.js.map