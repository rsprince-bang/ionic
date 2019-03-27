import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TrackProgressPage } from './track-progress.page';
var routes = [
    {
        path: '',
        component: TrackProgressPage
    }
];
var TrackProgressPageModule = /** @class */ (function () {
    function TrackProgressPageModule() {
    }
    TrackProgressPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [TrackProgressPage]
        })
    ], TrackProgressPageModule);
    return TrackProgressPageModule;
}());
export { TrackProgressPageModule };
//# sourceMappingURL=track-progress.module.js.map