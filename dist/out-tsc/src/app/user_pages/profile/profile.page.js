import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FoodSuggestionsService } from 'src/app/services/food-suggestions.service';
import { GlobalServicesService } from 'src/app/services/global-services.service';
import { ApiCallService } from 'src/app/services/api-call.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
var ProfilePage = /** @class */ (function () {
    function ProfilePage(foodSuggestionsService, globalServices, myAPI, router, alertController) {
        this.foodSuggestionsService = foodSuggestionsService;
        this.globalServices = globalServices;
        this.myAPI = myAPI;
        this.router = router;
        this.alertController = alertController;
        this.dayNumber = null;
        this.date = null;
        this.previousDiets = [];
        this.startInfo = { date: "...", height: "...", weight: "..." };
        this.profileImageURL = "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y";
        this.userMeasurements = null;
    }
    ProfilePage.prototype.ngOnInit = function () {
    };
    ProfilePage.prototype.ionViewWillEnter = function () {
        this.date = this.globalServices.getTodayDate();
        this.dayNumber = this.foodSuggestionsService.getDietDayNumber(this.date);
        this.getProfileDetails();
    };
    ProfilePage.prototype.getProfileDetails = function () {
        var _this = this;
        this.myAPI.makeAPIcall("user_statistics.php", {
            "action": "getProfileDetails"
        }, true).subscribe(function (result) {
            if (result.error) {
                _this.myAPI.handleMyAPIError(result.error);
            }
            else {
                _this.previousDiets = result.success.prev_diets;
                if (result.success.profile_image && result.success.profile_image.hasOwnProperty('url')) {
                    _this.profileImageURL = environment.API_URL + result.success.profile_image.url;
                }
                _this.startInfo.date = result.success.start_date;
                _this.startInfo.height = Math.floor(result.success.user_measurements.height_inches / 12) + '\'' + result.success.user_measurements.height_inches % 12 + '"';
                _this.startInfo.weight = result.success.user_measurements.weight_lbs;
                _this.userMeasurements = result.success.user_measurements;
            }
        });
    };
    ProfilePage.prototype.confirmReset = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Confirm',
                            message: 'Are you sure you want to reset your diet?',
                            buttons: [
                                {
                                    text: 'Yes',
                                    handler: function () {
                                        _this.resetDiet();
                                    }
                                },
                                {
                                    text: 'No',
                                    handler: function () {
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProfilePage.prototype.resetDiet = function () {
        var _this = this;
        this.myAPI.makeAPIcall("users.php", {
            "action": "resetDiet",
            "today_date": this.date,
            "yesterday_date": this.globalServices.getPreviousDate(this.date)
        }, true).subscribe(function (result) {
            if (result.error) {
                _this.myAPI.handleMyAPIError(result.error);
            }
            else {
                localStorage.setItem('diet_start_date', JSON.stringify(result.success.diet_start_date));
                _this.ionViewWillEnter();
            }
        });
    };
    ProfilePage.prototype.viewOldDiet = function (from_date, to_date) {
        // console.log("View old diet here");
        // console.log(from_date);
        // console.log(to_date);
    };
    ProfilePage.prototype.uploadPicture = function ($event) {
        var _this = this;
        this.myAPI.uploadImageFromFile($event.target.files[0], null, null, null, "profile")
            .subscribe(function (result) {
            if (result.error) {
                _this.myAPI.handleMyAPIError(result.error);
            }
            else {
                _this.profileImageURL = environment.API_URL + result.url;
            }
        });
    };
    ProfilePage.prototype.redirectToUpdatePage = function () {
        var navigationExtras = {
            state: {
                action: "update",
                userMeasurements: this.userMeasurements
            }
        };
        this.router.navigate(['enter-measurements'], navigationExtras);
    };
    ProfilePage = tslib_1.__decorate([
        Component({
            selector: 'app-profile',
            templateUrl: './profile.page.html',
            styleUrls: ['./profile.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [FoodSuggestionsService, GlobalServicesService, ApiCallService, Router,
            AlertController])
    ], ProfilePage);
    return ProfilePage;
}());
export { ProfilePage };
//# sourceMappingURL=profile.page.js.map