import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TrackMealPage } from './track-meal.page';
var routes = [
    {
        path: '',
        component: TrackMealPage
    }
];
var TrackMealPageModule = /** @class */ (function () {
    function TrackMealPageModule() {
    }
    TrackMealPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [TrackMealPage]
        })
    ], TrackMealPageModule);
    return TrackMealPageModule;
}());
export { TrackMealPageModule };
//# sourceMappingURL=track-meal.module.js.map