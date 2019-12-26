import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NavController } from '@ionic/angular';
var GlobalServicesService = /** @class */ (function () {
    function GlobalServicesService(router, /*private nativePageTransitions: NativePageTransitions, */ navCtrl, http) {
        this.router = router;
        this.navCtrl = navCtrl;
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
        // let options: NativeTransitionOptions = {
        //   direction: 'left',
        //   duration: 400,
        //   slowdownfactor: -1
        // }
        // this.nativePageTransitions.slide(options);
        //this.router.navigateByUrl(url);
        this.navCtrl.navigateForward(url);
    };
    GlobalServicesService.prototype.swipeRight = function (url) {
        // let options: NativeTransitionOptions = {
        //   direction: 'right',
        //   duration: 400,
        //   slowdownfactor: -1
        // }
        // this.nativePageTransitions.slide(options);
        //this.router.navigateByUrl(url);
        this.navCtrl.navigateBack(url);
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
    GlobalServicesService.prototype.getPreviousDate = function (date) {
        var d_string = date + " 00:00:00";
        var currentdate = new Date(d_string.replace(/-/g, '/'));
        var yesterday = new Date(currentdate);
        yesterday.setDate(currentdate.getDate() - 1);
        var dd = String(yesterday.getDate()).padStart(2, '0'); //yesterday's date
        var mm = String(yesterday.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = yesterday.getFullYear();
        return yyyy + '-' + mm + '-' + dd;
    };
    GlobalServicesService.prototype.getNextDate = function (date) {
        var d_string = date + " 00:00:00";
        var currentdate = new Date(d_string.replace(/-/g, '/'));
        var tomorrow = new Date(currentdate);
        tomorrow.setDate(currentdate.getDate() + 1);
        var dd = String(tomorrow.getDate()).padStart(2, '0'); //yesterday's date
        var mm = String(tomorrow.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = tomorrow.getFullYear();
        return yyyy + '-' + mm + '-' + dd;
    };
    GlobalServicesService.prototype.getDate = function (day) {
        //day must be yesterday, today, tomorrow
        var day_string = null;
        if (day == "yesterday") {
            var today = new Date();
            var yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            var dd = String(yesterday.getDate()).padStart(2, '0'); //yesterday's date
            var mm = String(yesterday.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = yesterday.getFullYear();
            day_string = yyyy + '-' + mm + '-' + dd;
        }
        else if (day == "today") {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            day_string = yyyy + '-' + mm + '-' + dd;
        }
        else if (day == "tomorrow") {
            var today = new Date();
            var tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);
            var dd = String(tomorrow.getDate()).padStart(2, '0'); //tomorrow's date
            var mm = String(tomorrow.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = tomorrow.getFullYear();
            day_string = yyyy + '-' + mm + '-' + dd;
        }
        return day_string;
    };
    GlobalServicesService.prototype.getDateFromObject = function (dateObject) {
        var dd = String(dateObject.getDate()).padStart(2, '0');
        var mm = String(dateObject.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = dateObject.getFullYear();
        var string = yyyy + '-' + mm + '-' + dd;
        return string;
    };
    GlobalServicesService.prototype.getDateAsHumanString = function (datestring) {
        //var dateObj = new Date(datestring + " 00:00:00");
        var d_string = datestring + " 00:00:00";
        var dateObj = new Date(d_string.replace(/-/g, '/'));
        return dateObj.toDateString();
    };
    GlobalServicesService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Router, NavController, HttpClient])
    ], GlobalServicesService);
    return GlobalServicesService;
}());
export { GlobalServicesService };
//# sourceMappingURL=global-services.service.js.map