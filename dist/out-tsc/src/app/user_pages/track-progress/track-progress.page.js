import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var TrackProgressPage = /** @class */ (function () {
    function TrackProgressPage(httpClient) {
        this.httpClient = httpClient;
        this.items = [];
    }
    TrackProgressPage.prototype.ngOnInit = function () {
        var _this = this;
        this.httpClient.get('https://randomuser.me/api/?results=300').subscribe(function (res) {
            _this.items = res['results'];
            //console.log(this.items);
        });
    };
    TrackProgressPage = tslib_1.__decorate([
        Component({
            selector: 'app-track-progress',
            templateUrl: './track-progress.page.html',
            styleUrls: ['./track-progress.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], TrackProgressPage);
    return TrackProgressPage;
}());
export { TrackProgressPage };
//# sourceMappingURL=track-progress.page.js.map