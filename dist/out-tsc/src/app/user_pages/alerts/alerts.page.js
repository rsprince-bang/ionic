import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Platform, AlertController, ModalController } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AlertsPickerModalPage } from '../alerts-picker-modal/alerts-picker-modal.page';
var AlertsPage = /** @class */ (function () {
    function AlertsPage(plt, localNotifications, alertCtrl, modalController) {
        this.plt = plt;
        this.localNotifications = localNotifications;
        this.alertCtrl = alertCtrl;
        this.modalController = modalController;
        this.scheduled = [];
        this.modalResponse = null;
        /*
        this.plt.ready().then(() => {
          this.localNotifications.on('click').subscribe(res => {
            let msg = res.data ? res.data.mydata : '';
            this.showAlert(res.title, res.text, msg);
          });
     
          this.localNotifications.on('trigger').subscribe(res => {
            let msg = res.data ? res.data.mydata : '';
            this.showAlert(res.title, res.text, msg);
          });
        });*/
    }
    AlertsPage.prototype.ngOnInit = function () {
    };
    AlertsPage.prototype.ionViewWillEnter = function () {
        this.getAllAlarms();
    };
    AlertsPage.prototype.openModal = function (alarm_id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: AlertsPickerModalPage,
                            componentProps: { alarm_id: alarm_id }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (response) {
                            _this.modalResponse = response;
                            _this.scheduleNotification(_this.modalResponse.data.title, _this.modalResponse.data.date, _this.modalResponse.data.time, alarm_id);
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AlertsPage.prototype.scheduleNotification = function (title, date, time, alarm_id) {
        var notificationIdString = date + time;
        notificationIdString = notificationIdString.replace(/-/g, ""); //global
        notificationIdString = notificationIdString.replace(/:/g, "");
        var notificationIdInteger = parseFloat(notificationIdString);
        var options = {
            id: notificationIdInteger,
            title: 'Alert',
            text: title,
            data: { mydata: 'My hidden message' },
            // trigger: { in: 6, unit: ELocalNotificationTriggerUnit.SECOND },
            trigger: { at: new Date(date + "T" + time + ":00") },
            lockscreen: true,
            foreground: true,
        };
        this.localNotifications.schedule(options);
        //call the delete function wich in turn will call the getAlarms function to update main page,
        //it bugs out of first try after app restart and then i works
        //added refresher for now
        this.deleteAlarm(alarm_id);
    };
    AlertsPage.prototype.getAllAlarms = function () {
        var _this = this;
        this.localNotifications.getAll().then(function (res) {
            _this.scheduled = res;
            _this.translateDateTime();
        });
    };
    AlertsPage.prototype.deleteAlarm = function (id) {
        var _this = this;
        this.localNotifications.clear(id).then(function () {
            _this.getAllAlarms();
        });
    };
    AlertsPage.prototype.doRefresh = function (event) {
        this.getAllAlarms();
        event.target.complete();
    };
    AlertsPage.prototype.translateDateTime = function () {
        for (var i = 0; i < this.scheduled.length; i++) {
            var date = new Date(this.scheduled[i].trigger.at);
            this.scheduled[i].date = date.toLocaleDateString();
            this.scheduled[i].time = date.toLocaleTimeString().replace(/:\d{2}\s/, ' '); //remove seconds
        }
    };
    /*
    recurringNotification() {
      this.localNotifications.schedule({
        id: 22,
        title: 'Recurring',
        text: 'Recurring every ',
        trigger: { every: ELocalNotificationTriggerUnit.MINUTE }
      });
    }
   
    repeatingDaily() {
      this.localNotifications.schedule({
        id: 42,
        title: 'Good Morning',
        text: 'Code something epic today!',
        trigger: { every: { hour: 9, minute: 30 } }
      });
    }*/
    AlertsPage.prototype.showAlert = function (header, sub, msg) {
        this.alertCtrl.create({
            header: header,
            subHeader: sub,
            message: msg,
            buttons: ['Ok']
        }).then(function (alert) { return alert.present(); });
    };
    AlertsPage.prototype.setSound = function () {
        if (this.plt.is('android')) {
            return 'file://assets/sounds/shame.mp3';
        }
        else {
            return 'file://assets/sounds/bell.mp3';
        }
    };
    AlertsPage = tslib_1.__decorate([
        Component({
            selector: 'app-alerts',
            templateUrl: './alerts.page.html',
            styleUrls: ['./alerts.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Platform,
            LocalNotifications,
            AlertController,
            ModalController])
    ], AlertsPage);
    return AlertsPage;
}());
export { AlertsPage };
//# sourceMappingURL=alerts.page.js.map