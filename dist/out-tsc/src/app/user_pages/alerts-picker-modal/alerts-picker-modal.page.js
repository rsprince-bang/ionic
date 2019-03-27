import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
var AlertsPickerModalPage = /** @class */ (function () {
    function AlertsPickerModalPage(navParams, modalController, localNotifications) {
        this.navParams = navParams;
        this.modalController = modalController;
        this.localNotifications = localNotifications;
        this.selected_date = null;
        this.selected_time = null;
        this.selected_title = null;
        this.alarm_id = null;
    }
    AlertsPickerModalPage.prototype.ngOnInit = function () {
        var _this = this;
        this.alarm_id = this.navParams.get('alarm_id');
        if (this.alarm_id != -1) {
            this.localNotifications.get(this.alarm_id).then(function (notification) {
                _this.selected_title = notification.text;
                var date = new Date(notification.trigger.at);
                _this.selected_date = _this.formatDate(date);
                _this.selected_time = _this.formatTime(date);
            });
        }
        else {
            //initialize for new alarm
            //var date = new Date();
            //this.selected_date = this.formatDate(date);
            //this.selected_time = this.formatTime(date);
        }
    };
    AlertsPickerModalPage.prototype.cancelModal = function () {
        this.modalController.dismiss();
    };
    AlertsPickerModalPage.prototype.saveAlarm = function () {
        this.modalController.dismiss({ "title": this.selected_title, "date": this.selected_date, "time": this.selected_time });
    };
    AlertsPickerModalPage.prototype.formatDate = function (date) {
        var dayN = date.getDate();
        var dayS = "";
        if (dayN < 10) {
            dayS = "0" + dayN.toString();
        }
        else {
            dayS = dayN.toString();
        }
        var monthN = date.getMonth() + 1;
        var monthS = "";
        if (monthN < 10) {
            monthS = "0" + monthN.toString();
        }
        else {
            monthS = monthN.toString();
        }
        var year = date.getFullYear();
        return year + "-" + monthS + "-" + dayS;
    };
    AlertsPickerModalPage.prototype.formatTime = function (date) {
        var hourN = date.getHours();
        var hourS = "";
        if (hourN < 10) {
            hourS = "0" + hourN.toString();
        }
        else {
            hourS = hourN.toString();
        }
        var minutesN = date.getMinutes();
        var minutesS = "";
        if (minutesN < 10) {
            minutesS = "0" + minutesN.toString();
        }
        else {
            minutesS = minutesN.toString();
        }
        return hourS + ":" + minutesS;
    };
    AlertsPickerModalPage = tslib_1.__decorate([
        Component({
            selector: 'app-alerts-picker-modal',
            templateUrl: './alerts-picker-modal.page.html',
            styleUrls: ['./alerts-picker-modal.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavParams,
            ModalController,
            LocalNotifications])
    ], AlertsPickerModalPage);
    return AlertsPickerModalPage;
}());
export { AlertsPickerModalPage };
//# sourceMappingURL=alerts-picker-modal.page.js.map