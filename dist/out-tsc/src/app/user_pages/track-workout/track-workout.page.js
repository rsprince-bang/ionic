import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalServicesService } from 'src/app/services/global-services.service';
import { ModalController } from '@ionic/angular';
import { TrackWorkoutModalPage } from '../track-workout-modal/track-workout-modal.page';
var TrackWorkoutPage = /** @class */ (function () {
    function TrackWorkoutPage(activatedRoute, globalServices, modalController) {
        this.activatedRoute = activatedRoute;
        this.globalServices = globalServices;
        this.modalController = modalController;
        this.day = null;
        this.disablechecksmarks = false;
        this.randomWorkouts = [
            { name: 'Bench press', isChecked: true },
            { name: 'Squads', isChecked: false },
            { name: 'Curls', isChecked: true },
            { name: 'Pull ups', isChecked: true },
            { name: 'Chin ups', isChecked: false },
            { name: 'Push ups', isChecked: true },
            { name: 'Triceps extensions', isChecked: true },
            { name: 'Calves', isChecked: false },
            { name: 'Crunches', isChecked: false },
        ];
        this.todayWorkouts = [];
    }
    TrackWorkoutPage.prototype.ngOnInit = function () {
        this.day = this.activatedRoute.snapshot.paramMap.get('day');
        //get 2 random meals for testing stackoverflow func
        this.todayWorkouts = this.randomWorkouts.sort(function () { return .5 - Math.random(); }).slice(0, 2);
        //default day is 5 , i.e. 5 == today
        //if anyuthing before that will be disabled; anything after will be unchecked
        for (var i = 0; i < this.todayWorkouts.length; i++) {
            if (this.day < 5) {
                this.disablechecksmarks = true;
            }
            else if (this.day > 5) {
                this.todayWorkouts[i].isChecked = false;
            }
        }
    };
    TrackWorkoutPage.prototype.handleSwipeLeft = function () {
        var nextday = parseInt(this.day) + 1;
        this.globalServices.swipeLeft("/track-workout/" + nextday);
    };
    TrackWorkoutPage.prototype.handleSwipeRight = function () {
        if (this.day > 1) {
            var prevday = parseInt(this.day) - 1;
            this.globalServices.swipeRight("/track-workout/" + prevday);
        }
    };
    TrackWorkoutPage.prototype.openExersize = function (workout) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: TrackWorkoutModalPage,
                            componentProps: { workout: workout }
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: 
                    /*     modal.onDidDismiss()
                          .then((response) => {
                            console.log(response);
                          }); */
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TrackWorkoutPage = tslib_1.__decorate([
        Component({
            selector: 'app-track-workout',
            templateUrl: './track-workout.page.html',
            styleUrls: ['./track-workout.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, GlobalServicesService, ModalController])
    ], TrackWorkoutPage);
    return TrackWorkoutPage;
}());
export { TrackWorkoutPage };
//# sourceMappingURL=track-workout.page.js.map