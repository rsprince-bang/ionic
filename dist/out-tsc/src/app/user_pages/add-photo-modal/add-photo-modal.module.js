import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AddPhotoModalPage } from './add-photo-modal.page';
var routes = [
    {
        path: '',
        component: AddPhotoModalPage
    }
];
var AddPhotoModalPageModule = /** @class */ (function () {
    function AddPhotoModalPageModule() {
    }
    AddPhotoModalPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                ReactiveFormsModule
            ],
            declarations: [AddPhotoModalPage]
        })
    ], AddPhotoModalPageModule);
    return AddPhotoModalPageModule;
}());
export { AddPhotoModalPageModule };
//# sourceMappingURL=add-photo-modal.module.js.map