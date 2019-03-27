import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EnterMeasurementsPage } from './enter-measurements.page';
var routes = [
    {
        path: '',
        component: EnterMeasurementsPage
    }
];
var EnterMeasurementsPageModule = /** @class */ (function () {
    function EnterMeasurementsPageModule() {
    }
    EnterMeasurementsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                ReactiveFormsModule
            ],
            declarations: [EnterMeasurementsPage]
        })
    ], EnterMeasurementsPageModule);
    return EnterMeasurementsPageModule;
}());
export { EnterMeasurementsPageModule };
//# sourceMappingURL=enter-measurements.module.js.map