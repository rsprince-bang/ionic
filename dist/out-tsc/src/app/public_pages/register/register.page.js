import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'; //in order to use forms I had to import "ReactiveFormsModule" in this page's module
import { ApiCallService } from 'src/app/services/api-call.service';
import { GlobalServicesService } from 'src/app/services/global-services.service';
import { Router } from '@angular/router';
var RegisterPage = /** @class */ (function () {
    function RegisterPage(router, formBuilder, myAPI, globalServices) {
        this.router = router;
        this.formBuilder = formBuilder;
        this.myAPI = myAPI;
        this.globalServices = globalServices;
    }
    RegisterPage.prototype.ngOnInit = function () {
        //initialize and set form values
        this.registerForm = this.formBuilder.group({
            first_name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
            last_name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
            email: ['', [Validators.required, Validators.email]],
            username: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(1)]],
            password_verify: ['', [Validators.required, Validators.minLength(1)]]
        });
    };
    RegisterPage.prototype.register = function () {
        var _this = this;
        if (this.registerForm.value.password == this.registerForm.value.password_verify) {
            this.myAPI.makeAPIcall("login.php", {
                "action": "register",
                "form": this.registerForm.value,
                "today": this.globalServices.getDate("today"),
                "fromIonic": "yes"
            }).subscribe(function (result) {
                if (result.error) {
                    _this.myAPI.presentToastWithOptions(result.error);
                }
                else if (result.success) {
                    _this.router.navigateByUrl("/enter-measurements"); // not work ???
                    _this.myAPI.presentToastWithOptions("Account has been created.");
                }
                else {
                    _this.myAPI.presentToastWithOptions("Something went wrong, please try again later.");
                }
            });
        }
        else {
            this.myAPI.presentToastWithOptions("Password does not match.");
        }
    };
    RegisterPage = tslib_1.__decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.page.html',
            styleUrls: ['./register.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, FormBuilder, ApiCallService, GlobalServicesService])
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.page.js.map