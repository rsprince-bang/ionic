import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController, AlertController } from '@ionic/angular';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { GlobalServicesService } from './global-services.service';
var ApiCallService = /** @class */ (function () {
    function ApiCallService(http, loadingController, alertController, router, globalservice) {
        this.http = http;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.router = router;
        this.globalservice = globalservice;
        this.headers = new HttpHeaders({
        //'Content-Type': 'application/json'  //this one is default
        //'Content-Type': 'application/x-www-form-urlencoded'
        });
        this.options = { headers: this.headers };
        this.loading = null;
        this.isLoading = false;
    }
    ApiCallService.prototype.makeAPIcall = function (page, data, auth_needed) {
        var _this = this;
        if (auth_needed === void 0) { auth_needed = false; }
        if (auth_needed) {
            data.token = localStorage.getItem("token");
            data.user_id = localStorage.getItem("user_id");
        }
        //this.presentLoadingWithOptions();
        this.presentLoading();
        return this.http.post(environment.API_URL + page, JSON.stringify(data), this.options).pipe(map(function (results) {
            //this.loading.dismiss();
            _this.dismissLoading();
            return results;
        }), catchError(function (error) {
            //this.loading.dismiss();
            _this.dismissLoading();
            _this.showError(error);
            return throwError(error);
        }));
    };
    ApiCallService.prototype.makeSilentCall = function (page, data, auth_needed) {
        if (auth_needed === void 0) { auth_needed = false; }
        if (auth_needed) {
            data.token = localStorage.getItem("token");
            data.user_id = localStorage.getItem("user_id");
        }
        this.http.post(environment.API_URL + page, JSON.stringify(data), this.options).subscribe(function () {
            //do nothing
        });
    };
    /*   async presentLoadingWithOptions() {
        this.loading = await this.loadingController.create({
          spinner: "lines",
          animated: true,
          backdropDismiss: false,
          cssClass: 'custom-class custom-loading',
          duration: null,
          keyboardClose: true,
          message: 'Please wait...',
    
          translucent: true,
          
        });
        return await this.loading.present();
      } */
    ApiCallService.prototype.presentLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isLoading = true;
                        return [4 /*yield*/, this.loadingController.create({
                                spinner: "lines",
                                animated: true,
                                backdropDismiss: false,
                                cssClass: 'custom-class custom-loading',
                                duration: null,
                                keyboardClose: true,
                                message: 'Please wait...',
                                translucent: true,
                            }).then(function (a) {
                                a.present().then(function () {
                                    //console.log('presented');
                                    if (!_this.isLoading) {
                                        a.dismiss().then(function () {
                                            //console.log('abort presenting')
                                        });
                                    }
                                });
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiCallService.prototype.dismissLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isLoading = false;
                        return [4 /*yield*/, this.loadingController.dismiss().then(function () {
                                console.log('dismissed');
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiCallService.prototype.showError = function (error) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Error',
                            message: 'We were unable handle your request, please try again later with better Wi-Fi connection.',
                            buttons: ['OK']
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiCallService.prototype.handleMyAPIError = function (error) {
        if (error == "Expired token") {
            this.globalservice.logOut();
        }
    };
    ApiCallService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, LoadingController, AlertController, Router,
            GlobalServicesService])
    ], ApiCallService);
    return ApiCallService;
}());
export { ApiCallService };
//# sourceMappingURL=api-call.service.js.map