import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AlertsPage } from './alerts.page';
var routes = [
    {
        path: '',
        component: AlertsPage
    }
];
var AlertsPageModule = /** @class */ (function () {
    function AlertsPageModule() {
    }
    AlertsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AlertsPage]
        })
    ], AlertsPageModule);
    return AlertsPageModule;
}());
export { AlertsPageModule };
//# sourceMappingURL=alerts.module.js.map