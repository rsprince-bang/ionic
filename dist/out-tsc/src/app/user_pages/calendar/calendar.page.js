import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ApiCallService } from 'src/app/services/api-call.service';
var CalendarPage = /** @class */ (function () {
    function CalendarPage(myAPI) {
        this.myAPI = myAPI;
        this.title = null;
        this.selectedDay = new Date();
        this.eventSource = [];
        this.calendar = {
            mode: 'month',
            currentDate: this.selectedDay
            /*     dateFormatter: {
                    formatMonthViewDay: function(date:Date) {
                        return date.getDate().toString();
                    },
                    formatMonthViewDayHeader: function(date:Date) {
                        return 'testMDH';
                    },
                    formatMonthViewTitle: function(date:Date) {
                        return 'testMT';
                    },
                    formatWeekViewDayHeader: function(date:Date) {
                        return 'testWDH';
                    },
                    formatWeekViewTitle: function(date:Date) {
                        return 'testWT';
                    },
                    formatWeekViewHourColumn: function(date:Date) {
                        return 'testWH';
                    },
                    formatDayViewHourColumn: function(date:Date) {
                        return 'testDH';
                    },
                    formatDayViewTitle: function(date:Date) {
                        return 'testDT';
                    }
                } */
        };
        this.markDisabled = function (date) {
            //var current = new Date();
            //return date < current;
            return false;
        };
        this.eventSource.push({
            title: 'Title for the event',
            startTime: new Date(),
            endTime: new Date(),
            allDay: true,
            eventColor: 'green'
        });
    }
    CalendarPage.prototype.ngOnInit = function () {
    };
    ;
    CalendarPage.prototype.onCurrentDateChanged = function (ev) {
        console.log('Currently viewed date: ' + ev);
    };
    CalendarPage.prototype.onViewTitleChanged = function (title) {
        var _this = this;
        this.title = title;
        this.myAPI.makeAPIcall("user_statistics.php", {
            "action": "getFoodsInRange"
        }, true).subscribe(function (result) {
            if (result.error) {
                _this.myAPI.handleMyAPIError(result.error);
            }
            else {
                console.log(result);
            }
        });
    };
    CalendarPage.prototype.onEventSelected = function (event) {
        console.log(event);
    };
    CalendarPage = tslib_1.__decorate([
        Component({
            selector: 'app-calendar',
            templateUrl: './calendar.page.html',
            styleUrls: ['./calendar.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ApiCallService])
    ], CalendarPage);
    return CalendarPage;
}());
export { CalendarPage };
//# sourceMappingURL=calendar.page.js.map