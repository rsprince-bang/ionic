import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalServicesService } from 'src/app/services/global-services.service';
import { ApiCallService } from 'src/app/services/api-call.service';
import { FoodSuggestionsService } from 'src/app/services/food-suggestions.service';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { AlertController } from '@ionic/angular';
var HomePage = /** @class */ (function () {
    function HomePage(router, globalServices, activatedRoute, myAPI, foodSuggestionsService, alertController) {
        this.router = router;
        this.globalServices = globalServices;
        this.activatedRoute = activatedRoute;
        this.myAPI = myAPI;
        this.foodSuggestionsService = foodSuggestionsService;
        this.alertController = alertController;
        this.day = null;
        this.date = null;
        this.dayNumber = null;
        this.planLength_weeks = null;
        this.planLength_days = null;
        this.warnText = { proteinText: "...", carbsText: "...", fatText: "..." };
        this.segment_choice = 'nutrition';
        this.dailyCaloriesIntake = null;
        this.dietCaloriesIntake = null;
        this.caloriesConsumed = 0;
        this.caloriesFromProteinAsP = 0;
        this.caloriesFromCarbsAsP = 0;
        this.caloriesFromFatAsP = 0;
        this.warnCaloriesFromProteinAsP = 0;
        this.warnCaloriesFromCarbsAsP = 0;
        this.warnCaloriesFromFatAsP = 0;
        this.meals = [];
        this.exercises = [];
        this.workout_completed = false;
        this.workout_completed_msn = "";
        this.percent = 0;
        this.circlesubtitle = "";
        this.circlecolor = "#2b2b2b"; //gray atr first
        this.dayNutritionInfo = { "phase": null, "phaseday": null, "phasename": null, "daynutrition": { "protein": null, "carbs": null, "fat": null } };
        this.score = 0;
        this.backgroundColor = "#2b2b2b";
        //declare barcharts
        this.barChartOptions = {
            responsive: true,
            tooltips: { enabled: false },
            hover: { mode: null },
            scales: {
                yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            min: 0,
                            display: false
                        },
                        gridLines: {
                            display: false
                        }
                    }],
                xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }]
            },
            plugins: {
                datalabels: {
                    anchor: 'end',
                    clamp: true,
                    offset: 0,
                    font: {
                        size: this.chartOptionsfontSize(),
                        weight: 900,
                    }
                }
            }
        };
        this.barChartLabels = ['protein', 'carbs', 'fat'];
        this.barChartType = 'bar';
        this.barChartLegend = false;
        this.barChartPlugins = [pluginDataLabels];
        this.barChartData = [
            { data: [1, 2, 3], label: 'Grams consumed', backgroundColor: "rgb(56, 129, 255)" },
            { data: [4, 5, 6], label: 'Limit', backgroundColor: "rgb(191, 191, 191)" }
        ];
    }
    HomePage.prototype.if = function () {
    };
    HomePage.prototype.ngOnInit = function () {
        this.day = this.activatedRoute.snapshot.paramMap.get('day');
        this.date = this.globalServices.getDate(this.day);
        if (!this.globalServices.hasDailyCaloriesIntake()) {
            this.router.navigateByUrl("/enter-measurements");
        }
    };
    HomePage.prototype.ionViewWillEnter = function () {
        this.updatepage();
        this.getFeedback();
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
                // cant swipe after tomorrow 
                break;
            }
        }
    };
    HomePage.prototype.handleSwipeRight = function () {
        switch (this.day) {
            case "today": {
                if (this.dayNumber > 1) {
                    //if its not your first day, then you can see previous day
                    this.globalServices.swipeRight("/home/yesterday");
                }
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
    HomePage.prototype.doRefresh = function (event) {
        this.updatepage();
        event.target.complete();
    };
    HomePage.prototype.updatepage = function () {
        var _this = this;
        this.backgroundColor = this.changeBackgroundColor();
        this.dayNumber = this.foodSuggestionsService.getDietDayNumber(this.date);
        this.planLength_weeks = this.foodSuggestionsService.getDietPlanWeeks();
        this.planLength_days = this.planLength_weeks * 7;
        this.dayNutritionInfo = this.foodSuggestionsService.getDietDayDescription(this.date, this.planLength_weeks);
        this.barChartLabels = ['Protein ' + this.dayNutritionInfo.daynutrition.protein + '%', 'Carbs ' + this.dayNutritionInfo.daynutrition.carbs + '%', 'Fat ' + this.daynutritionOfFat()];
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
                _this.workout_completed = _this.foodSuggestionsService.getWorkoutStatus(_this.exercises);
                _this.workoutCompleted();
                _this.calculateCaloriesConsumed();
            }
        });
    };
    HomePage.prototype.calculateCaloriesConsumed = function () {
        var info = this.foodSuggestionsService.getCaloriesPercentages(this.date, this.meals, this.exercises, this.planLength_weeks);
        this.barChartData[0].data = [Math.round(info.caloriesFromProtein), Math.round(info.caloriesFromCarbs), Math.round(info.caloriesFromFat)];
        this.barChartData[1].data = [Math.round(info.targetCaloriesFromProtein), Math.round(info.targetCaloriesFromCarbs), Math.round(info.targetCaloriesFromFat)];
        this.caloriesConsumed = info.caloriesConsumed;
        this.caloriesFromProteinAsP = info.caloriesFromProteinAsP;
        this.caloriesFromCarbsAsP = info.caloriesFromCarbsAsP;
        this.caloriesFromFatAsP = info.caloriesFromFatAsP;
        this.dietCaloriesIntake = info.dietCaloriesIntake;
        this.percent = info.percent;
        this.warnText.proteinText = this.warnTextFunction(info.targetCaloriesFromProtein, info.caloriesFromProtein);
        this.warnText.carbsText = this.warnTextFunction(info.targetCaloriesFromCarbs, info.caloriesFromCarbs);
        this.warnText.fatText = this.warnTextFunction(info.targetCaloriesFromFat, info.caloriesFromFat);
        if (info.color == "red") {
            this.circlecolor = "#CA1616";
        }
        else {
            this.circlecolor = "rgb(56, 129, 255";
        }
        this.circlesubtitle = this.caloriesConsumed + "/" + this.dietCaloriesIntake;
        //this.score = this.foodSuggestionsService.getScore(this.caloriesConsumed, this.dietCaloriesIntake, this.workout_completed, info.color, this.percent);
    };
    HomePage.prototype.workoutCompleted = function () {
        if (this.workout_completed) {
            this.workout_completed_msn = " Workout Completed";
        }
        else {
            this.workout_completed_msn = "Need Workout";
        }
    };
    HomePage.prototype.warnTextFunction = function (target, current) {
        var text = '';
        var difference = Math.floor(target - current);
        if (target > current && this.caloriesConsumed > this.dietCaloriesIntake) {
            text = "missing " + difference + " Calories";
        }
        else if (target > current) {
            text = "need " + difference + " Calories";
        }
        else if (target < current) {
            text = "consumed too much " + difference + " Calories";
        }
        return text;
    };
    HomePage.prototype.daynutritionOfFat = function () {
        var text = null;
        if (this.dayNutritionInfo.daynutrition.fat == undefined) {
            text = '5%';
        }
        else {
            text = this.dayNutritionInfo.daynutrition.fat + '%';
        }
        return text;
    };
    HomePage.prototype.chartOptionsfontSize = function () {
        var windowSize = window.matchMedia('(min-width: 700px)');
        var fontSize = null;
        if (windowSize.matches) {
            fontSize = 16;
        }
        else {
            fontSize = 11;
        }
        return fontSize;
    };
    HomePage.prototype.changeBackgroundColor = function () {
        var color = null;
        switch (this.day) {
            case 'today': {
                color = '#e2f6fa';
                break;
            }
            case 'tomorrow': {
                color = '#99d2ff';
                break;
            }
            case 'yesterday': {
                color = '#99d2ff';
                break;
            }
        }
        return color;
    };
    HomePage.prototype.getFeedback = function () {
        //this.dayNumber is stored in lcoal storage so it will be available at the time this functino gets called 
        if (this.dayNumber > 7) {
            var current_week = Math.ceil(this.dayNumber / 7);
            var lastFeedback = parseInt(localStorage.getItem("lastFeedback"));
            if (Number.isNaN(lastFeedback) || lastFeedback < current_week) {
                this.showFeedbackConfirm(current_week);
            }
        }
    };
    HomePage.prototype.showFeedbackConfirm = function (current_week) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Confirm',
                            message: 'Are you happy with your progress so far?',
                            buttons: [
                                {
                                    text: 'Yes',
                                    handler: function () {
                                        _this.updateFeedback('yes', current_week);
                                    }
                                },
                                {
                                    text: 'No',
                                    handler: function () {
                                        _this.updateFeedback('no', current_week);
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
    HomePage.prototype.updateFeedback = function (feedback, weeknum) {
    };
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: './home.page.html',
            styleUrls: ['./home.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, GlobalServicesService, ActivatedRoute, ApiCallService,
            FoodSuggestionsService, AlertController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map