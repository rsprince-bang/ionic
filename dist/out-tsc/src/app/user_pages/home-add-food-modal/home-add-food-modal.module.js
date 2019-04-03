import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HomeAddFoodModalPage } from './home-add-food-modal.page';
var routes = [
    {
        path: '',
        component: HomeAddFoodModalPage
    }
];
var HomeAddFoodModalPageModule = /** @class */ (function () {
    function HomeAddFoodModalPageModule() {
    }
    HomeAddFoodModalPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [HomeAddFoodModalPage]
        })
    ], HomeAddFoodModalPageModule);
    return HomeAddFoodModalPageModule;
}());
export { HomeAddFoodModalPageModule };
//# sourceMappingURL=home-add-food-modal.module.js.map