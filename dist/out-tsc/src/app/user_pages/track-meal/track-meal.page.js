import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { GlobalServicesService } from 'src/app/services/global-services.service';
import { FoodSuggestionsService } from 'src/app/services/food-suggestions.service';
import { ApiCallService } from 'src/app/services/api-call.service';
import { HomeAddFoodModalPage } from '../home-add-food-modal/home-add-food-modal.page';
var TrackMealPage = /** @class */ (function () {
    function TrackMealPage(globalServices, activatedRoute, foodSuggestionsService, myAPI, modalController) {
        this.globalServices = globalServices;
        this.activatedRoute = activatedRoute;
        this.foodSuggestionsService = foodSuggestionsService;
        this.myAPI = myAPI;
        this.modalController = modalController;
        this.day = "";
        this.today = false;
        this.dayNumber = null;
        this.date = null;
        this.meals = [];
        this.exercises = [];
        this.status = "";
        this.percent = 0;
        this.circlesubtitle = "";
        this.circlecolor = "#c0c0c0"; //gray atr first
        this.dayNutritionInfo = { "phase": null, "phaseday": null, "daynutrition": { "protein": null, "carbs": null, "fat": null } };
        this.dietCaloriesIntake = null;
        this.caloriesConsumed = 0;
        this.caloriesFromProteinAsP = 0;
        this.caloriesFromCarbsAsP = 0;
        this.caloriesFromFatAsP = 0;
    }
    TrackMealPage.prototype.ngOnInit = function () {
        this.date = this.activatedRoute.snapshot.paramMap.get('day');
        if (this.date == '') {
            this.date = this.date = this.globalServices.getTodayDate();
        }
        this.dayNumber = this.foodSuggestionsService.getDietDayNumber(this.date);
        if (this.date == this.globalServices.getTodayDate()) {
            if (this.today = true) {
                this.day = "TODAY";
            }
        }
        this.loadMeals();
    };
    TrackMealPage.prototype.doRefresh = function (event) {
        this.ngOnInit();
        event.target.complete();
    };
    TrackMealPage.prototype.handleSwipeLeft = function () {
        if (this.today) {
            //won't swipe left tomorrow
        }
        else {
            this.globalServices.swipeLeft("/track-meal/" + this.globalServices.getNextDate(this.date));
        }
    };
    TrackMealPage.prototype.handleSwipeRight = function () {
        if (this.dayNumber > 1) {
            this.globalServices.swipeRight("/track-meal/" + this.globalServices.getPreviousDate(this.date));
        }
    };
    TrackMealPage.prototype.loadMeals = function () {
        var _this = this;
        var planLength_weeks = this.foodSuggestionsService.getDietPlanWeeks();
        this.dayNutritionInfo = this.foodSuggestionsService.getDietDayDescription(this.date, planLength_weeks);
        this.myAPI.makeAPIcall("meals.php", {
            "action": "getDayInfo",
            "date": this.date
        }, true).subscribe(function (result) {
            if (result.error) {
                _this.myAPI.handleMyAPIError(result.error);
            }
            else {
                _this.meals = result.success.dayInfo.meals;
                _this.exercises = result.success.dayInfo.exercises;
                _this.calculateCaloriesConsumed();
            }
        });
    };
    TrackMealPage.prototype.openFoodModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: HomeAddFoodModalPage,
                            componentProps: { date: this.date }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (response) {
                            if (response.data) {
                                _this.loadMeals();
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TrackMealPage.prototype.removeMeal = function (meal_id) {
        this.meals = this.meals.filter(function (el) { return el.id != meal_id; });
        this.calculateCaloriesConsumed();
        this.myAPI.makeSilentCall("meals.php", {
            "action": "removeMeal",
            "meal_id": meal_id
        }, true);
    };
    TrackMealPage.prototype.calculateCaloriesConsumed = function () {
        var planLength_weeks = this.foodSuggestionsService.getDietPlanWeeks();
        var info = this.foodSuggestionsService.getCaloriesPercentages(this.date, this.meals, this.exercises, planLength_weeks);
        this.caloriesConsumed = info.caloriesConsumed;
        this.caloriesFromProteinAsP = info.caloriesFromProteinAsP;
        this.caloriesFromCarbsAsP = info.caloriesFromCarbsAsP;
        this.caloriesFromFatAsP = info.caloriesFromFatAsP;
        this.dietCaloriesIntake = info.dietCaloriesIntake;
        this.percent = info.percent;
        if (info.color == "red") {
            this.circlecolor = "#CA1616";
            this.status = "BAD";
        }
        else if (this.caloriesConsumed == 0) {
            this.status = "NO INFO";
        }
        else {
            this.circlecolor = "rgb(56, 129, 255";
            this.status = "GOOD";
        }
        this.circlesubtitle = this.caloriesConsumed + "/" + this.dietCaloriesIntake;
    };
    TrackMealPage = tslib_1.__decorate([
        Component({
            selector: 'app-track-meal',
            templateUrl: './track-meal.page.html',
            styleUrls: ['./track-meal.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [GlobalServicesService, ActivatedRoute,
            FoodSuggestionsService, ApiCallService, ModalController])
    ], TrackMealPage);
    return TrackMealPage;
}());
export { TrackMealPage };
//# sourceMappingURL=track-meal.page.js.map