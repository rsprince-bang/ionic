import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { NgCircleProgressModule } from 'ng-circle-progress';
var routes = [
    {
        path: '',
        component: HomePage
    }
];
var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                NgCircleProgressModule.forRoot({
                    "radius": 60,
                    "maxPercent": 100,
                    "unitsColor": "#ffffff",
                    "outerStrokeWidth": 5,
                    "outerStrokeColor": "#FFFFFF",
                    "innerStrokeColor": "#FFFFFF",
                    "titleColor": "#ffffff",
                    "subtitleColor": "#ffffff",
                    "showInnerStroke": false,
                    "startFromZero": false,
                    "showZeroOuterStroke": false
                })
            ],
            declarations: [HomePage]
        })
    ], HomePageModule);
    return HomePageModule;
}());
export { HomePageModule };
//# sourceMappingURL=home.module.js.map