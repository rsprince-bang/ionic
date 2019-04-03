import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalServicesService } from 'src/app/services/global-services.service';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { HomeAddFoodModalPage } from '../home-add-food-modal/home-add-food-modal.page';
import { ApiCallService } from 'src/app/services/api-call.service';
var HomePage = /** @class */ (function () {
    function HomePage(router, globalServices, activatedRoute, modalController, actionSheetController, myAPI) {
        this.router = router;
        this.globalServices = globalServices;
        this.activatedRoute = activatedRoute;
        this.modalController = modalController;
        this.actionSheetController = actionSheetController;
        this.myAPI = myAPI;
        this.day = null;
        this.date = null;
        this.segment_choice = 'nutrition';
        this.dailyCaloriesIntake = null;
        this.dietCaloriesIntake = null;
        this.caloriesConsumed = 0;
        this.todaymeals = [];
        this.disabletoggles = false;
    }
    HomePage.prototype.ngOnInit = function () {
        this.day = this.activatedRoute.snapshot.paramMap.get('day');
        this.date = this.globalServices.getDate(this.day);
        if (!this.globalServices.hasDailyCaloriesIntake()) {
            this.router.navigateByUrl("/enter-measurements");
        }
    };
    HomePage.prototype.ionViewWillEnter = function () {
        this.updatepage();
    };
    HomePage.prototype.handleSwipeLeft = function () {
        switch (this.day) {
            case "yesterday": {
                this.globalServices.swipeLeft("/home/today");
                break;
            }
            case "today": {
                this.globalServices.swipeLeft("/home/tomorrow");
                break;
            }
            default: {
                //cant swipe past tomorrow 
                break;
            }
        }
    };
    HomePage.prototype.handleSwipeRight = function () {
        switch (this.day) {
            case "today": {
                this.globalServices.swipeRight("/home/yesterday");
                break;
            }
            case "tomorrow": {
                this.globalServices.swipeRight("/home/today");
                break;
            }
            default: {
                //cant swipe before yesterday 
                break;
            }
        }
    };
    HomePage.prototype.doRefresh = function (event) {
        console.log("Update current list on pull, update from server regadless");
        event.target.complete();
    };
    HomePage.prototype.updatepage = function () {
        this.dailyCaloriesIntake = localStorage.getItem('dailyCaloriesIntake');
        this.dietCaloriesIntake = this.dailyCaloriesIntake - 200;
        //pull meals based on day
        if (this.day == "yesterday") {
            this.disabletoggles = true;
            console.log("Pull meals for yesterday");
        }
        else if (this.day == "today") {
            this.todaymeals = JSON.parse(localStorage.getItem('todayMeals'));
        }
        else if (this.day == "tomorrow") {
            console.log("Pull meals for tomorrow");
        }
        this.calculateCaloriesConsumed();
    };
    HomePage.prototype.addFoodModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: HomeAddFoodModalPage,
                            componentProps: { day: this.day }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (response) {
                            if (response.data) {
                                _this.addToList(response.data);
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /*   getFoodsList(){
        this.myAPI.makeAPIcall(
          "users.php",
          {
            "action": "getFoodsList",
            "date": this.date
          },
          true
        ).subscribe((result)=>{
          if( result.error ){
            this.myAPI.handleMyAPIError(result.error);
          }
          else{
            this.todaymeals = result.success.foods;
            for(let i=0; i<this.todaymeals.length; i++){
              this.todaymeals[i].isChecked = true;
            }
            this.calculateCaloriesConsumed();
          }
        });
      } */
    HomePage.prototype.addToList = function (data) {
        this.todaymeals.push({ "id": data.meal_id, "meal_name": data.item.food_name, "calories": data.calories, "isChecked": true });
        this.calculateCaloriesConsumed();
    };
    HomePage.prototype.removeFromList = function (meal_id) {
        this.todaymeals = this.todaymeals.filter(function (el) { return el.id != meal_id; });
        this.myAPI.makeSilentCall("users.php", {
            "action": "removeMeal",
            "meal_id": meal_id
        }, true);
        this.calculateCaloriesConsumed();
    };
    HomePage.prototype.calculateCaloriesConsumed = function () {
        //reset before accumulation duh
        this.caloriesConsumed = 0;
        for (var i = 0; i < this.todaymeals.length; i++) {
            this.caloriesConsumed = this.caloriesConsumed + parseInt(this.todaymeals[i].calories);
        }
    };
    HomePage.prototype.presentActionSheet = function (meal_id, mealName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.day != "yesterday")) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.actionSheetController.create({
                                header: mealName,
                                buttons: [{
                                        text: 'Delete',
                                        role: 'destructive',
                                        icon: 'trash',
                                        handler: function () {
                                            _this.removeFromList(meal_id);
                                        }
                                    },
                                    {
                                        text: 'Cancel',
                                        icon: 'close',
                                        role: 'cancel',
                                        handler: function () {
                                            //console.log('Cancel clicked');
                                        }
                                    }]
                            })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: './home.page.html',
            styleUrls: ['./home.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, GlobalServicesService, ActivatedRoute,
            ModalController, ActionSheetController, ApiCallService])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map