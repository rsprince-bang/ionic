import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
var GlobalServicesService = /** @class */ (function () {
    function GlobalServicesService(router, nativePageTransitions, http) {
        this.router = router;
        this.nativePageTransitions = nativePageTransitions;
        this.http = http;
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
        //I cant include the API service in this file because
        //circular includes happen...
        // so do a manual post
        this.http.post(environment.API_URL + "users.php", JSON.stringify({
            "action": "logout",
            "user_id": localStorage.getItem("user_id"),
            "token": localStorage.getItem("token")
        }), { headers: new HttpHeaders({}) }).subscribe(function () {
            //do nothing
        });
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
    GlobalServicesService.prototype.getTodayDate = function () {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var today_string = yyyy + '-' + mm + '-' + dd;
        return today_string;
    };
    GlobalServicesService.prototype.getDate = function (day) {
        //day must be yesterday, today, tomorrow
        var day_string = null;
        if (day == "yesterday") {
        }
        else if (day == "today") {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            day_string = yyyy + '-' + mm + '-' + dd;
        }
        else if (day == "tomorrow") {
        }
        return day_string;
    };
    GlobalServicesService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Router, NativePageTransitions, HttpClient])
    ], GlobalServicesService);
    return GlobalServicesService;
}());
export { GlobalServicesService };
//# sourceMappingURL=global-services.service.js.map