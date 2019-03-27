import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TrackWorkoutPage } from './track-workout.page';
var routes = [
    {
        path: '',
        component: TrackWorkoutPage
    }
];
var TrackWorkoutPageModule = /** @class */ (function () {
    function TrackWorkoutPageModule() {
    }
    TrackWorkoutPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [TrackWorkoutPage]
        })
    ], TrackWorkoutPageModule);
    return TrackWorkoutPageModule;
}());
export { TrackWorkoutPageModule };
//# sourceMappingURL=track-workout.module.js.map