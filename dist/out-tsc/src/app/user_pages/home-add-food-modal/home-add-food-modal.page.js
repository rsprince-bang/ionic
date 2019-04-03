import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiCallService } from 'src/app/services/api-call.service';
import { GlobalServicesService } from 'src/app/services/global-services.service';
var HomeAddFoodModalPage = /** @class */ (function () {
    function HomeAddFoodModalPage(modalController, myAPI, globalServices) {
        this.modalController = modalController;
        this.myAPI = myAPI;
        this.globalServices = globalServices;
        this.date = null;
        this.searchResults = [];
        this.searchTerm = '';
    }
    HomeAddFoodModalPage.prototype.ngOnInit = function () {
        this.date = this.globalServices.getDate(this.day);
    };
    HomeAddFoodModalPage.prototype.searchChanged = function () {
        var _this = this;
        this.myAPI.makeAPIcall("food_api.php", {
            "action": "loadFoods",
            "food": this.searchTerm
        }, true).subscribe(function (result) {
            if (result.error) {
                _this.modalController.dismiss();
                _this.myAPI.handleMyAPIError(result.error);
            }
            else {
                _this.searchResults = result.success.foods;
            }
        });
    };
    HomeAddFoodModalPage.prototype.clearSearch = function () {
        this.searchResults = [];
    };
    HomeAddFoodModalPage.prototype.cancelModal = function () {
        this.modalController.dismiss();
    };
    HomeAddFoodModalPage.prototype.showMoreInfo = function (item) {
        var _this = this;
        if (item.hasOwnProperty('servings')) {
            //already expanded, collapse
            delete item.servings;
        }
        else {
            this.myAPI.makeAPIcall("food_api.php", {
                "action": "loadFoodById",
                "food_id": item.food_id
            }, true).subscribe(function (result) {
                if (result.error) {
                    _this.modalController.dismiss();
                    _this.myAPI.handleMyAPIError(result.error);
                }
                else {
                    //check for array
                    if (result.success.food_details.hasOwnProperty('servings')) {
                        if (result.success.food_details.servings.hasOwnProperty('serving')) {
                            if (Array.isArray(result.success.food_details.servings.serving)) {
                                item.servings = result.success.food_details.servings.serving;
                            }
                            else {
                                item.servings = [result.success.food_details.servings.serving];
                            }
                        }
                    }
                    //or ony one serving resposne, fuck this api
                    else if (result.success.food_details.hasOwnProperty('serving_description')) {
                        //we will assume that it also has the other 3 properties
                        item.servings = [result.success.food_detail];
                    }
                }
            });
        }
    };
    HomeAddFoodModalPage.prototype.addToList = function (item, calories, protein, fat, carbohydrate) {
        /*     this.myAPI.makeSilentCall(
              "users.php",
              {
                "action": "saveMeal",
                "food_name": item.food_name,
                "calories": calories,
                "protein": protein,
                "fat": fat,
                "carbohydrate": carbohydrate,
                "day": this.date
              },
              true
            ); */
        var _this = this;
        //this.modalController.dismiss({ "item":item, "calories":calories});
        this.myAPI.makeAPIcall("users.php", {
            "action": "saveMeal",
            "food_name": item.food_name,
            "calories": calories,
            "protein": protein,
            "fat": fat,
            "carbohydrate": carbohydrate,
            "day": this.date
        }, true).subscribe(function (result) {
            if (result.error) {
                _this.modalController.dismiss();
                _this.myAPI.handleMyAPIError(result.error);
            }
            else {
                _this.modalController.dismiss({ "item": item, "calories": calories, meal_id: result.success.meal_id });
            }
        });
    };
    HomeAddFoodModalPage = tslib_1.__decorate([
        Component({
            selector: 'app-home-add-food-modal',
            templateUrl: './home-add-food-modal.page.html',
            styleUrls: ['./home-add-food-modal.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController, ApiCallService, GlobalServicesService])
    ], HomeAddFoodModalPage);
    return HomeAddFoodModalPage;
}());
export { HomeAddFoodModalPage };
//# sourceMappingURL=home-add-food-modal.page.js.map