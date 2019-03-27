import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServicesService } from 'src/app/services/global-services.service';
var Tab1Page = /** @class */ (function () {
    function Tab1Page(router, globalServices) {
        this.router = router;
        this.globalServices = globalServices;
        this.segment_choice = 'nutrition';
    }
    Tab1Page.prototype.handleSwipeLeft = function () {
        this.globalServices.swipeLeft("/home/tabs/tab2");
    };
    Tab1Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab1',
            templateUrl: 'tab1.page.html',
            styleUrls: ['tab1.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [Router, GlobalServicesService])
    ], Tab1Page);
    return Tab1Page;
}());
export { Tab1Page };
//# sourceMappingURL=tab1.page.js.map