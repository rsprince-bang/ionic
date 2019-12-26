import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiCallService } from 'src/app/services/api-call.service';
import { GlobalServicesService } from 'src/app/services/global-services.service';
var HomeAddWorkoutModalPage = /** @class */ (function () {
    function HomeAddWorkoutModalPage(modalController, myAPI, globalServices) {
        this.modalController = modalController;
        this.myAPI = myAPI;
        this.globalServices = globalServices;
        this.searchResults = [];
        this.searchTerm = '';
    }
    HomeAddWorkoutModalPage.prototype.ngOnInit = function () {
    };
    HomeAddWorkoutModalPage.prototype.searchExercises = function () {
        var _this = this;
        this.myAPI.makeAPIcall(
        //"exercises.php",
        "food_api_nutritionix.php", {
            "action": "loadExercises",
            "searchterm": this.searchTerm
        }, true).subscribe(function (result) {
            if (result.error) {
                _this.modalController.dismiss();
                _this.myAPI.handleMyAPIError(result.error);
            }
            else {
                _this.searchResults = result.success.api_exercises;
            }
        });
    };
    HomeAddWorkoutModalPage.prototype.clearSearch = function () {
        this.searchResults = [];
    };
    HomeAddWorkoutModalPage.prototype.cancelModal = function () {
        this.modalController.dismiss();
    };
    HomeAddWorkoutModalPage.prototype.selectExercise = function (item) {
        if (item.selected) {
            item.selected = false;
        }
        else {
            item.selected = true;
        }
    };
    HomeAddWorkoutModalPage.prototype.addExercise = function (exercises) {
        var _this = this;
        this.myAPI.makeAPIcall(
        //"exercises.php",
        "food_api_nutritionix.php", {
            "action": "saveExercise",
            "exercises": exercises,
            "day": this.date
        }, true).subscribe(function (result) {
            _this.modalController.dismiss(result);
        });
    };
    HomeAddWorkoutModalPage = tslib_1.__decorate([
        Component({
            selector: 'app-home-add-workout-modal',
            templateUrl: './home-add-workout-modal.page.html',
            styleUrls: ['./home-add-workout-modal.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController, ApiCallService, GlobalServicesService])
    ], HomeAddWorkoutModalPage);
    return HomeAddWorkoutModalPage;
}());
export { HomeAddWorkoutModalPage };
//# sourceMappingURL=home-add-workout-modal.page.js.map