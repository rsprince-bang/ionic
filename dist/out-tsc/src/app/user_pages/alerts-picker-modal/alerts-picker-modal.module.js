import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AlertsPickerModalPage } from './alerts-picker-modal.page';
var routes = [
    {
        path: '',
        component: AlertsPickerModalPage
    }
];
var AlertsPickerModalPageModule = /** @class */ (function () {
    function AlertsPickerModalPageModule() {
    }
    AlertsPickerModalPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AlertsPickerModalPage]
        })
    ], AlertsPickerModalPageModule);
    return AlertsPickerModalPageModule;
}());
export { AlertsPickerModalPageModule };
//# sourceMappingURL=alerts-picker-modal.module.js.map