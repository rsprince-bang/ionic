import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ApiCallService } from 'src/app/services/api-call.service';
import { Router } from '@angular/router';
import { Events, ToastController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms'; //in order to use forms I had to import "ReactiveFormsModule" in this page's module
import { GlobalServicesService } from 'src/app/services/global-services.service';
var LoginPage = /** @class */ (function () {
    function LoginPage(myAPI, router, events, formBuilder, toastController, globalServices) {
        this.myAPI = myAPI;
        this.router = router;
        this.events = events;
        this.formBuilder = formBuilder;
        this.toastController = toastController;
        this.globalServices = globalServices;
        this.userInfo = null;
    }
    LoginPage.prototype.ngOnInit = function () {
        //initialize and set form values
        this.credentialsForm = this.formBuilder.group({
            email: ['stoyan.raychev@vpxsports.com', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(1)]]
        });
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.myAPI.makeAPIcall("login.php", {
            "action": "login",
            "email": this.credentialsForm.value.email,
            "password": this.credentialsForm.value.password,
            //in case its a returning user lets load the meals as well
            "yesterday": this.globalServices.getDate("yesterday"),
            "today": this.globalServices.getDate("today"),
            "tomorrow": this.globalServices.getDate("tomorrow")
        })
            .subscribe(function (result) {
            _this.userInfo = result;
            if (_this.userInfo.error) {
                _this.presentToastWithOptions(_this.userInfo.error);
            }
            else if (_this.userInfo.success) {
                localStorage.setItem("token", _this.userInfo.success.token);
                localStorage.setItem("user_id", _this.userInfo.success.user_id);
                _this.events.publish("user logged in", 1111, 2222); //test passsing args
                if (_this.userInfo.success.first_time_user && _this.userInfo.success.first_time_user == "yes") {
                    _this.router.navigateByUrl("/enter-measurements");
                }
                else {
                    localStorage.setItem('dailyCaloriesIntake', _this.userInfo.success.dailyCaloriesIntake);
                    localStorage.setItem('homepageMeals', JSON.stringify(result.success.meals));
                    localStorage.setItem('date_registered', JSON.stringify(result.success.date_registered));
                    _this.router.navigateByUrl("/home/today");
                }
            }
            else {
                _this.presentToastWithOptions("Something went wrong, please try again alter.");
            }
        });
    };
    LoginPage.prototype.presentToastWithOptions = function (message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: message,
                            showCloseButton: true,
                            position: 'bottom',
                            closeButtonText: 'OK',
                            duration: 3000,
                            translucent: false
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPage = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ApiCallService,
            Router,
            Events,
            FormBuilder,
            ToastController,
            GlobalServicesService])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map