import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
var TrackWorkoutModalPage = /** @class */ (function () {
    function TrackWorkoutModalPage(navParams, modalController, iab) {
        this.navParams = navParams;
        this.modalController = modalController;
        this.iab = iab;
        this.workout = null;
    }
    TrackWorkoutModalPage.prototype.ngOnInit = function () {
        this.workout = this.navParams.get('workout');
    };
    TrackWorkoutModalPage.prototype.cancelModal = function () {
        this.modalController.dismiss();
    };
    TrackWorkoutModalPage.prototype.watchonYoutube = function () {
        /*
        window.open(‘http://example.com’, ‘_system’);	Loads in the system browser
        window.open(‘http://example.com’, ‘_blank’);	Loads in the InAppBrowser
        window.open(‘http://example.com’, ‘_blank’, ‘location=no’);	Loads in the InAppBrowser with no location bar
        window.open(‘http://example.com’, ‘_self’);	Loads in the Cordova web view
        */
        var browser = this.iab.create('https://www.youtube.com/', '_system');
    };
    TrackWorkoutModalPage = tslib_1.__decorate([
        Component({
            selector: 'app-track-workout-modal',
            templateUrl: './track-workout-modal.page.html',
            styleUrls: ['./track-workout-modal.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavParams, ModalController, InAppBrowser])
    ], TrackWorkoutModalPage);
    return TrackWorkoutModalPage;
}());
export { TrackWorkoutModalPage };
//# sourceMappingURL=track-workout-modal.page.js.map