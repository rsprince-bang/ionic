import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'; //in order to use forms I had to import "ReactiveFormsModule" in this page's module
import { ApiCallService } from 'src/app/services/api-call.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FoodSuggestionsService } from 'src/app/services/food-suggestions.service';
var EnterMeasurementsPage = /** @class */ (function () {
    function EnterMeasurementsPage(formBuilder, myAPI, route, router, navCtrl, foodSuggestionsService) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.myAPI = myAPI;
        this.route = route;
        this.router = router;
        this.navCtrl = navCtrl;
        this.foodSuggestionsService = foodSuggestionsService;
        this.action = "save";
        this.currentUserMeasurements = { feet: "", inches: "", weight_lbs: "", target_weight_lbs: "", age: "", gender: "", activity_level: "", plan_length: "" };
        this.route.queryParams.subscribe(function (params) {
            if (_this.router.getCurrentNavigation().extras.state) {
                _this.action = _this.router.getCurrentNavigation().extras.state.action; // has value of update because it is coming from profile page
                _this.currentUserMeasurements = _this.router.getCurrentNavigation().extras.state.userMeasurements;
                _this.currentUserMeasurements.feet = "" + Math.floor(_this.router.getCurrentNavigation().extras.state.userMeasurements.height_inches / 12);
                _this.currentUserMeasurements.inches = "" + _this.router.getCurrentNavigation().extras.state.userMeasurements.height_inches % 12;
                _this.currentUserMeasurements.plan_length = _this.foodSuggestionsService.getDietPlanWeeks().toString();
            }
        });
    }
    EnterMeasurementsPage.prototype.ngOnInit = function () {
        this.measurementsForm = this.formBuilder.group({
            heightFeet: [this.currentUserMeasurements.feet, [Validators.required, Validators.pattern('[0-9]{1}')]],
            heightInches: [this.currentUserMeasurements.inches, [Validators.required, Validators.pattern('[0-9]+'), Validators.maxLength(2), Validators.max(11)]],
            weight: [this.currentUserMeasurements.weight_lbs, [Validators.required, Validators.pattern('[0-9]+')]],
            target_weight: [this.currentUserMeasurements.target_weight_lbs, [Validators.required, Validators.pattern('[0-9]+')]],
            age: [this.currentUserMeasurements.age, [Validators.required, Validators.pattern('[0-9]+')]],
            gender: [this.currentUserMeasurements.gender, [Validators.required]],
            activity: [this.currentUserMeasurements.activity_level, [Validators.required]],
            plan: [this.currentUserMeasurements.plan_length, [Validators.required, Validators.pattern('[0-9]+')]]
        });
    };
    EnterMeasurementsPage.prototype.submitMeasurements = function () {
        var _this = this;
        this.myAPI.makeAPIcall("users.php", {
            "action": "submitMeasurements",
            "form": this.measurementsForm.value
        }, true).subscribe(function (result) {
            if (result.error) {
                _this.myAPI.handleMyAPIError(result.error);
            }
            else {
                localStorage.setItem("dailyCaloriesIntake", result.success.dailyCaloriesIntake);
                localStorage.setItem("currentCaloriesIntake", result.success.currentCaloriesIntake);
                localStorage.setItem("diet_plan_length", _this.measurementsForm.value.plan);
                if (_this.action == "update") {
                    _this.router.navigateByUrl("/profile");
                }
                else {
                    _this.router.navigateByUrl("/home/today");
                }
            }
        });
    };
    EnterMeasurementsPage.prototype.goBack = function () {
        this.navCtrl.navigateBack('/profile');
    };
    EnterMeasurementsPage = tslib_1.__decorate([
        Component({
            selector: 'app-enter-measurements',
            templateUrl: './enter-measurements.page.html',
            styleUrls: ['./enter-measurements.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, ApiCallService, ActivatedRoute, Router, NavController,
            FoodSuggestionsService])
    ], EnterMeasurementsPage);
    return EnterMeasurementsPage;
}());
export { EnterMeasurementsPage };
//# sourceMappingURL=enter-measurements.page.js.map