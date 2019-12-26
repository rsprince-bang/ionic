import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalServicesService } from 'src/app/services/global-services.service';
import { ModalController } from '@ionic/angular';
import { FoodSuggestionsService } from 'src/app/services/food-suggestions.service';
import { ApiCallService } from 'src/app/services/api-call.service';
import { HomeAddWorkoutModalPage } from '../home-add-workout-modal/home-add-workout-modal.page';
var TrackWorkoutPage = /** @class */ (function () {
    function TrackWorkoutPage(activatedRoute, globalServices, modalController, foodSuggestionsService, myAPI) {
        this.activatedRoute = activatedRoute;
        this.globalServices = globalServices;
        this.modalController = modalController;
        this.foodSuggestionsService = foodSuggestionsService;
        this.myAPI = myAPI;
        this.day = "";
        this.today = false;
        this.dayNumber = null;
        this.date = null;
        this.meals = [];
        this.exercises = [];
    }
    TrackWorkoutPage.prototype.ngOnInit = function () {
        this.date = this.activatedRoute.snapshot.paramMap.get('day');
        if (this.date == '') {
            this.date = this.date = this.globalServices.getTodayDate();
        }
        this.dayNumber = this.foodSuggestionsService.getDietDayNumber(this.date);
        if (this.date == this.globalServices.getTodayDate()) {
            this.today = true;
            this.day = "Today";
        }
        this.loadExercises();
    };
    TrackWorkoutPage.prototype.doRefresh = function (event) {
        this.ngOnInit();
        event.target.complete();
    };
    TrackWorkoutPage.prototype.handleSwipeLeft = function () {
        if (this.today) {
            // won't swipeLeft 
        }
        else
            this.globalServices.swipeLeft("/track-workout/" + this.globalServices.getNextDate(this.date));
    };
    TrackWorkoutPage.prototype.handleSwipeRight = function () {
        if (this.dayNumber > 1) {
            this.globalServices.swipeRight("/track-workout/" + this.globalServices.getPreviousDate(this.date));
        }
    };
    TrackWorkoutPage.prototype.loadExercises = function () {
        var _this = this;
        this.myAPI.makeAPIcall("exercises.php", {
            "action": "getExercises",
            "date": this.date
        }, true).subscribe(function (result) {
            if (result.error) {
                _this.myAPI.handleMyAPIError(result.error);
            }
            else {
                _this.exercises = result.success.exercises;
            }
        });
    };
    TrackWorkoutPage.prototype.openExerciseModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: HomeAddWorkoutModalPage,
                            componentProps: { date: this.date }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (response) {
                            if (response.data) {
                                _this.loadExercises();
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TrackWorkoutPage.prototype.removeExercise = function (exercise_id) {
        this.exercises = this.exercises.filter(function (el) { return el.id != exercise_id; });
        this.myAPI.makeSilentCall("exercises.php", {
            "action": "removeExercise",
            "exercise_id": exercise_id
        }, true);
    };
    TrackWorkoutPage = tslib_1.__decorate([
        Component({
            selector: 'app-track-workout',
            templateUrl: './track-workout.page.html',
            styleUrls: ['./track-workout.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, GlobalServicesService, ModalController,
            FoodSuggestionsService, ApiCallService])
    ], TrackWorkoutPage);
    return TrackWorkoutPage;
}());
export { TrackWorkoutPage };
//# sourceMappingURL=track-workout.page.js.map