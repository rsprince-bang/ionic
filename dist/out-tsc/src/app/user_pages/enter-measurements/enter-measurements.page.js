import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'; //in order to use forms I had to import "ReactiveFormsModule" in this page's module
import { ApiCallService } from 'src/app/services/api-call.service';
import { Router } from '@angular/router';
var EnterMeasurementsPage = /** @class */ (function () {
    function EnterMeasurementsPage(formBuilder, myAPI, router) {
        this.formBuilder = formBuilder;
        this.myAPI = myAPI;
        this.router = router;
    }
    EnterMeasurementsPage.prototype.ngOnInit = function () {
        this.measurementsForm = this.formBuilder.group({
            heightFeet: ['5', [Validators.required, Validators.pattern('[0-9]{1}')]],
            heightInches: ['11', [Validators.required, Validators.pattern('[0-9]+'), Validators.maxLength(2), Validators.max(11)]],
            weight: ['160', [Validators.required, Validators.pattern('[0-9]+')]],
            age: ['34', [Validators.required, Validators.pattern('[0-9]+')]],
            gender: ['M', [Validators.required]],
            activity: ['1.2', [Validators.required]]
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
                _this.router.navigateByUrl("/home/tabs/tab2");
            }
        });
    };
    EnterMeasurementsPage = tslib_1.__decorate([
        Component({
            selector: 'app-enter-measurements',
            templateUrl: './enter-measurements.page.html',
            styleUrls: ['./enter-measurements.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, ApiCallService, Router])
    ], EnterMeasurementsPage);
    return EnterMeasurementsPage;
}());
export { EnterMeasurementsPage };
//# sourceMappingURL=enter-measurements.page.js.map