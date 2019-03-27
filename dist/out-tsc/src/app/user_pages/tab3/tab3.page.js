import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServicesService } from 'src/app/services/global-services.service';
var Tab3Page = /** @class */ (function () {
    function Tab3Page(router, globalServices) {
        this.router = router;
        this.globalServices = globalServices;
        this.segment_choice = 'nutrition';
    }
    Tab3Page.prototype.handleSwipeRight = function () {
        this.globalServices.swipeRight("/home/tabs/tab2");
    };
    Tab3Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab3',
            templateUrl: 'tab3.page.html',
            styleUrls: ['tab3.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [Router, GlobalServicesService])
    ], Tab3Page);
    return Tab3Page;
}());
export { Tab3Page };
//# sourceMappingURL=tab3.page.js.map