import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServicesService } from 'src/app/services/global-services.service';
var Tab2Page = /** @class */ (function () {
    function Tab2Page(router, globalServices) {
        this.router = router;
        this.globalServices = globalServices;
        this.segment_choice = 'nutrition';
        this.dailyCaloriesIntake = null;
        this.dietCaloriesIntake = null;
    }
    Tab2Page.prototype.ionViewWillEnter = function () {
        console.log("ionViewWillEnter");
        this.updatepage();
    };
    Tab2Page.prototype.handleSwipeLeft = function () {
        this.globalServices.swipeLeft("/home/tabs/tab3");
    };
    Tab2Page.prototype.handleSwipeRight = function () {
        this.globalServices.swipeRight("/home/tabs/tab1");
    };
    Tab2Page.prototype.doRefresh = function (event) {
        this.updatepage();
        event.target.complete();
    };
    Tab2Page.prototype.updatepage = function () {
        if (!this.globalServices.hasDailyCaloriesIntake()) {
            this.router.navigateByUrl("/enter-measurements");
        }
        else {
            this.dailyCaloriesIntake = localStorage.getItem('dailyCaloriesIntake');
            this.dietCaloriesIntake = this.dailyCaloriesIntake - 200;
        }
    };
    Tab2Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab2',
            templateUrl: 'tab2.page.html',
            styleUrls: ['tab2.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [Router, GlobalServicesService])
    ], Tab2Page);
    return Tab2Page;
}());
export { Tab2Page };
//# sourceMappingURL=tab2.page.js.map