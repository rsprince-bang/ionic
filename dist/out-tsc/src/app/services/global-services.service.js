import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
var GlobalServicesService = /** @class */ (function () {
    function GlobalServicesService(router, nativePageTransitions) {
        this.router = router;
        this.nativePageTransitions = nativePageTransitions;
    }
    GlobalServicesService.prototype.isLoggedIn = function () {
        var token = localStorage.getItem('token');
        if (token) {
            return true;
        }
        else {
            return false;
        }
    };
    GlobalServicesService.prototype.logOut = function () {
        localStorage.clear();
        this.router.navigateByUrl("/login");
    };
    GlobalServicesService.prototype.swipeLeft = function (url) {
        var options = {
            direction: 'left',
            duration: 400,
            slowdownfactor: -1
        };
        this.nativePageTransitions.slide(options);
        this.router.navigateByUrl(url);
    };
    GlobalServicesService.prototype.swipeRight = function (url) {
        var options = {
            direction: 'right',
            duration: 400,
            slowdownfactor: -1
        };
        this.nativePageTransitions.slide(options);
        this.router.navigateByUrl(url);
    };
    GlobalServicesService.prototype.hasDailyCaloriesIntake = function () {
        var dailyCaloriesIntake = localStorage.getItem('dailyCaloriesIntake');
        if (dailyCaloriesIntake) {
            return true;
        }
        else {
            return false;
        }
    };
    GlobalServicesService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Router, NativePageTransitions])
    ], GlobalServicesService);
    return GlobalServicesService;
}());
export { GlobalServicesService };
//# sourceMappingURL=global-services.service.js.map