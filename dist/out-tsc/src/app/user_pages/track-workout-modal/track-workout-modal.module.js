import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TrackWorkoutModalPage } from './track-workout-modal.page';
var routes = [
    {
        path: '',
        component: TrackWorkoutModalPage
    }
];
var TrackWorkoutModalPageModule = /** @class */ (function () {
    function TrackWorkoutModalPageModule() {
    }
    TrackWorkoutModalPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [TrackWorkoutModalPage]
        })
    ], TrackWorkoutModalPageModule);
    return TrackWorkoutModalPageModule;
}());
export { TrackWorkoutModalPageModule };
//# sourceMappingURL=track-workout-modal.module.js.map