import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiCallService } from 'src/app/services/api-call.service';
import { FoodSuggestionsService } from 'src/app/services/food-suggestions.service';
var HomeAddFoodModalPage = /** @class */ (function () {
    function HomeAddFoodModalPage(modalController, myAPI, foodSuggestionsService) {
        this.modalController = modalController;
        this.myAPI = myAPI;
        this.foodSuggestionsService = foodSuggestionsService;
        this.date = null; //passed from previous page
        this.searchResults = [];
        this.searchTerm = '';
    }
    HomeAddFoodModalPage.prototype.ngOnInit = function () {
        var planLength_weeks = this.foodSuggestionsService.getDietPlanWeeks();
        this.suggestedFoods = this.foodSuggestionsService.getFoodSuggestions(this.date, planLength_weeks);
    };
    HomeAddFoodModalPage.prototype.searchChanged = function () {
        var _this = this;
        if (this.searchTerm != '') {
            this.myAPI.makeAPIcall(
            //"food_api_edamam.php",
            "food_api_nutritionix.php", {
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
        }
        else {
            this.searchResults = [];
        }
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
    HomeAddFoodModalPage.prototype.addMeal = function (item, calories, protein, fat, carbs) {
        this.myAPI.makeSilentCall("meals.php", {
            "action": "saveMeal",
            "food_name": item.food_name,
            "calories": calories,
            "protein": protein,
            "fat": fat,
            "carbohydrate": carbs,
            "day": this.date
        }, true);
        this.modalController.dismiss(item);
    };
    HomeAddFoodModalPage.prototype.edamamAddMeal = function (foodname, foodId, quantity, measureURI) {
        var _this = this;
        if (quantity && quantity > 0) {
            this.myAPI.makeAPIcall("food_api_edamam.php", {
                "action": "edamamAddMeal",
                "foodname": foodname,
                "foodId": foodId,
                "quantity": quantity,
                "measureURI": measureURI,
                "day": this.date
            }, true).subscribe(function (result) {
                _this.modalController.dismiss(foodId);
            });
        }
    };
    HomeAddFoodModalPage.prototype.nutritionixAddMeal = function (foods) {
        var _this = this;
        this.myAPI.makeAPIcall("food_api_nutritionix.php", {
            "action": "nutritionixAddMeal",
            "foods": foods,
            "day": this.date
        }, true).subscribe(function (result) {
            _this.modalController.dismiss(result);
        });
    };
    HomeAddFoodModalPage.prototype.expandHint = function (hint) {
        if (hint.selected) {
            hint.selected = false;
        }
        else {
            hint.selected = true;
        }
    };
    HomeAddFoodModalPage = tslib_1.__decorate([
        Component({
            selector: 'app-home-add-food-modal',
            templateUrl: './home-add-food-modal.page.html',
            styleUrls: ['./home-add-food-modal.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController, ApiCallService, FoodSuggestionsService])
    ], HomeAddFoodModalPage);
    return HomeAddFoodModalPage;
}());
export { HomeAddFoodModalPage };
//# sourceMappingURL=home-add-food-modal.page.js.map