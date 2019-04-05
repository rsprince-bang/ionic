import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalServicesService } from 'src/app/services/global-services.service';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { HomeAddFoodModalPage } from '../home-add-food-modal/home-add-food-modal.page';
import { ApiCallService } from 'src/app/services/api-call.service';
import { FoodSuggestionsService } from 'src/app/services/food-suggestions.service';
var HomePage = /** @class */ (function () {
    function HomePage(router, globalServices, activatedRoute, modalController, actionSheetController, myAPI, foodSuggestionsService) {
        this.router = router;
        this.globalServices = globalServices;
        this.activatedRoute = activatedRoute;
        this.modalController = modalController;
        this.actionSheetController = actionSheetController;
        this.myAPI = myAPI;
        this.foodSuggestionsService = foodSuggestionsService;
        this.day = null;
        this.date = null;
        this.dayNumber = null;
        this.segment_choice = 'nutrition';
        this.dailyCaloriesIntake = null;
        this.dietCaloriesIntake = null;
        this.caloriesConsumed = 0;
        this.meals = [];
        this.disabletoggles = false;
        this.percent = 0;
        this.circlesubtitle = "";
        this.circlecolor = "#c0c0c0"; //gray atr first
        this.dayNutritionInfo = null;
    }
    HomePage.prototype.ngOnInit = function () {
        this.day = this.activatedRoute.snapshot.paramMap.get('day');
        this.date = this.globalServices.getDate(this.day);
        if (!this.globalServices.hasDailyCaloriesIntake()) {
            this.router.navigateByUrl("/enter-measurements");
        }
        //initialize them, so it doesnt throw errors, but they get updated later on
        this.dayNumber = this.foodSuggestionsService.getDietDayNumber(this.date);
        this.dayNutritionInfo = this.foodSuggestionsService.getDietDayDescription(this.date);
    };
    HomePage.prototype.ionViewWillEnter = function () {
        this.updatepage();
    };
    HomePage.prototype.handleSwipeLeft = function () {
        switch (this.day) {
            case "yesterday": {
                this.globalServices.swipeLeft("/home/today");
                break;
            }
            case "today": {
                this.globalServices.swipeLeft("/home/tomorrow");
                break;
            }
            default: {
                //cant swipe past tomorrow 
                break;
            }
        }
    };
    HomePage.prototype.handleSwipeRight = function () {
        switch (this.day) {
            case "today": {
                this.globalServices.swipeRight("/home/yesterday");
                break;
            }
            case "tomorrow": {
                this.globalServices.swipeRight("/home/today");
                break;
            }
            default: {
                //cant swipe before yesterday 
                break;
            }
        }
    };
    HomePage.prototype.updatepage = function () {
        this.dayNumber = this.foodSuggestionsService.getDietDayNumber(this.date);
        this.dayNutritionInfo = this.foodSuggestionsService.getDietDayDescription(this.date);
        console.log(this.dayNutritionInfo);
        this.dailyCaloriesIntake = localStorage.getItem('dailyCaloriesIntake');
        this.dietCaloriesIntake = this.dailyCaloriesIntake - 200;
        var meals = JSON.parse(localStorage.getItem('homepageMeals'));
        this.meals = meals[this.day];
        this.calculateCaloriesConsumed();
    };
    HomePage.prototype.doRefresh = function (event) {
        this.getFoodsList();
        event.target.complete();
    };
    HomePage.prototype.getFoodsList = function () {
        var _this = this;
        this.myAPI.makeAPIcall("users.php", {
            "action": "getFoodsList",
            "yesterday": this.globalServices.getDate("yesterday"),
            "today": this.globalServices.getDate("today"),
            "tomorrow": this.globalServices.getDate("tomorrow")
        }, true).subscribe(function (result) {
            if (result.error) {
                _this.myAPI.handleMyAPIError(result.error);
            }
            else {
                _this.dayNumber = _this.foodSuggestionsService.getDietDayNumber(_this.date);
                _this.dayNutritionInfo = _this.foodSuggestionsService.getDietDayDescription(_this.date);
                localStorage.setItem('homepageMeals', JSON.stringify(result.success.meals));
                _this.meals = result.success.meals[_this.day];
                for (var i = 0; i < _this.meals.length; i++) {
                    _this.meals[i].isChecked = true;
                }
                if (_this.day == "yesterday") {
                    _this.disabletoggles = true;
                }
                else if (_this.day == "today") {
                }
                else if (_this.day == "tomorrow") {
                }
                _this.calculateCaloriesConsumed();
            }
        });
    };
    HomePage.prototype.addToList = function (data) {
        this.meals.push({ "id": data.meal_id, "meal_name": data.item.food_name, "calories": data.calories, "isChecked": true });
        var meals = JSON.parse(localStorage.getItem('homepageMeals'));
        meals[this.day] = this.meals;
        localStorage.setItem('homepageMeals', JSON.stringify(meals));
        this.calculateCaloriesConsumed();
    };
    HomePage.prototype.removeFromList = function (meal_id) {
        this.meals = this.meals.filter(function (el) { return el.id != meal_id; });
        var meals = JSON.parse(localStorage.getItem('homepageMeals'));
        meals[this.day] = this.meals;
        localStorage.setItem('homepageMeals', JSON.stringify(meals));
        this.myAPI.makeSilentCall("users.php", {
            "action": "removeMeal",
            "meal_id": meal_id
        }, true);
        this.calculateCaloriesConsumed();
    };
    HomePage.prototype.calculateCaloriesConsumed = function () {
        //reset before accumulation duh
        this.caloriesConsumed = 0;
        for (var i = 0; i < this.meals.length; i++) {
            this.caloriesConsumed = this.caloriesConsumed + parseInt(this.meals[i].calories);
        }
        this.percent = this.caloriesConsumed * 100 / this.dietCaloriesIntake;
        if (this.percent > 100) {
            this.circlecolor = "#CA1616";
        }
        else {
            this.circlecolor = "#2FB202";
        }
        this.circlesubtitle = this.caloriesConsumed + "/" + this.dietCaloriesIntake;
    };
    HomePage.prototype.addFoodModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: HomeAddFoodModalPage,
                            componentProps: { day: this.day }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (response) {
                            if (response.data) {
                                _this.addToList(response.data);
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HomePage.prototype.presentActionSheet = function (meal_id, mealName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.day != "yesterday")) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.actionSheetController.create({
                                header: mealName,
                                buttons: [{
                                        text: 'Delete',
                                        role: 'destructive',
                                        icon: 'trash',
                                        handler: function () {
                                            _this.removeFromList(meal_id);
                                        }
                                    },
                                    {
                                        text: 'Cancel',
                                        icon: 'close',
                                        role: 'cancel',
                                        handler: function () {
                                            //console.log('Cancel clicked');
                                        }
                                    }]
                            })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: './home.page.html',
            styleUrls: ['./home.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, GlobalServicesService, ActivatedRoute,
            ModalController, ActionSheetController, ApiCallService,
            FoodSuggestionsService])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map