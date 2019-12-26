import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { ApiCallService } from 'src/app/services/api-call.service';
import { GlobalServicesService } from 'src/app/services/global-services.service';
import { CalendarComponent } from "ionic2-calendar/calendar";
import { FoodSuggestionsService } from 'src/app/services/food-suggestions.service';
var CalendarPage = /** @class */ (function () {
    function CalendarPage(myAPI, globalServices, foodSuggestionsService) {
        this.myAPI = myAPI;
        this.globalServices = globalServices;
        this.foodSuggestionsService = foodSuggestionsService;
        this.title = null;
        this.selectedDay = new Date();
        this.eventSource = [];
        //for specific date
        this.meals = [];
        this.exercises = [];
        this.workout_completed = false;
        this.date = null;
        this.info = null;
        this.score = 0;
        this.calendar = {
            mode: 'month',
            currentDate: this.selectedDay,
            dateFormatter: {
                formatMonthViewDay: function (date) {
                    return date.getDate().toString();
                }
            }
        };
    }
    CalendarPage.prototype.ngOnInit = function () {
    };
    ;
    CalendarPage.prototype.onViewTitleChanged = function (title) {
        var _this = this;
        this.title = title;
        this.myAPI.makeAPIcall("user_statistics.php", {
            "action": "getFoodsInRange",
            "rangeFrom": this.globalServices.getDateFromObject(this.daystemplate._projectedViews[0].context.view.dates[0].date),
            "rangeTo": this.globalServices.getDateFromObject(this.daystemplate._projectedViews[0].context.view.dates[41].date)
        }, true).subscribe(function (result) {
            if (result.error) {
                _this.myAPI.handleMyAPIError(result.error);
            }
            else {
                //returns an array of days with meals and exercises
                var planLength_weeks = _this.foodSuggestionsService.getDietPlanWeeks();
                for (var i = 0; i < result.success.daysInfo.length; i++) {
                    var dayCalorieInfo = _this.foodSuggestionsService.getCaloriesPercentages(result.success.daysInfo[i].date.date_consumed, result.success.daysInfo[i].meals, result.success.daysInfo[i].exercises, planLength_weeks);
                    var dateNoLeadingZeros = result.success.daysInfo[i].date.date_consumed.replace(/-0/g, "-");
                    //add to calendar
                    _this.eventSource.push({
                        title: 'None',
                        startTime: new Date(dateNoLeadingZeros),
                        endTime: new Date(dateNoLeadingZeros),
                        allDay: true,
                        color: dayCalorieInfo.color
                    });
                }
                _this.myCalendar.loadEvents();
            }
        });
    };
    CalendarPage.prototype.getEventClass = function (events) {
        if (events[0]) {
            return events[0].color;
        }
        else
            return '';
    };
    CalendarPage.prototype.onCurrentDateChanged = function (ev) {
        this.selectedDay = ev;
        var selectedDate = this.globalServices.getDateFromObject(ev);
        if (this.eventSource.length == 0) {
            this.showDateStats(this.globalServices.getTodayDate());
        }
        else {
            this.showDateStats(selectedDate);
        }
    };
    CalendarPage.prototype.showDateStats = function (datestring) {
        var _this = this;
        this.myAPI.makeAPIcall("meals.php", {
            "action": "getDayInfo",
            "date": datestring
        }, true).subscribe(function (result) {
            if (result.error) {
                _this.myAPI.handleMyAPIError(result.error);
            }
            else {
                _this.date = datestring;
                _this.meals = result.success.dayInfo.meals;
                _this.exercises = result.success.dayInfo.exercises;
                _this.workout_completed = _this.foodSuggestionsService.getWorkoutStatus(_this.exercises);
                var planLength_weeks = _this.foodSuggestionsService.getDietPlanWeeks();
                _this.info = _this.foodSuggestionsService.getCaloriesPercentages(datestring, _this.meals, _this.exercises, planLength_weeks);
                _this.score = _this.foodSuggestionsService.getScore(_this.info.caloriesConsumed, _this.info.dietCaloriesIntake, _this.workout_completed, _this.info.color, _this.info.percent);
                //console.log(this.info);
            }
        });
    };
    tslib_1.__decorate([
        ViewChild('daystemplate'),
        tslib_1.__metadata("design:type", Object)
    ], CalendarPage.prototype, "daystemplate", void 0);
    tslib_1.__decorate([
        ViewChild(CalendarComponent),
        tslib_1.__metadata("design:type", CalendarComponent)
    ], CalendarPage.prototype, "myCalendar", void 0);
    CalendarPage = tslib_1.__decorate([
        Component({
            selector: 'app-calendar',
            templateUrl: './calendar.page.html',
            styleUrls: ['./calendar.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ApiCallService, GlobalServicesService, FoodSuggestionsService])
    ], CalendarPage);
    return CalendarPage;
}());
export { CalendarPage };
//# sourceMappingURL=calendar.page.js.map