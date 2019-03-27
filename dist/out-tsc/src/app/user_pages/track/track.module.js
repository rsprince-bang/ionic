import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TrackPage } from './track.page';
var routes = [
    {
        path: '',
        component: TrackPage
    }
];
var TrackPageModule = /** @class */ (function () {
    function TrackPageModule() {
    }
    TrackPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [TrackPage]
        })
    ], TrackPageModule);
    return TrackPageModule;
}());
export { TrackPageModule };
//# sourceMappingURL=track.module.js.map