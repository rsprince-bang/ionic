import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { GlobalServicesService } from './global-services.service';
var ApiCallService = /** @class */ (function () {
    function ApiCallService(http, loadingController, alertController, router, globalservice, toastController) {
        this.http = http;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.router = router;
        this.globalservice = globalservice;
        this.toastController = toastController;
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
        this.presentLoading();
        return this.http.post(environment.API_URL + page, JSON.stringify(data), this.options).pipe(map(function (results) {
            _this.dismissLoading();
            return results;
        }), catchError(function (error) {
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
                                    if (!_this.isLoading) {
                                        a.dismiss().then(function () {
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
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiCallService.prototype.uploadImageFromFile = function (file, weight, fat_percent, comment, type) {
        var _this = this;
        this.presentLoading();
        //should be always authenticated call
        var formData = new FormData();
        formData.append("action", "saveImage");
        formData.append("token", localStorage.getItem("token"));
        formData.append("user_id", localStorage.getItem("user_id"));
        formData.append("date", this.globalservice.getTodayDate());
        formData.append("weight", weight);
        formData.append("fat_percent", fat_percent);
        formData.append("comment", comment);
        formData.append("type", type);
        formData.append('uploadFile', file, file.name);
        return this.http.post(environment.API_URL + "image_upload.php", formData)
            .pipe(map(function (results) {
            _this.dismissLoading();
            return results;
        }), catchError(function (error) {
            _this.dismissLoading();
            _this.showError(error);
            return throwError(error);
        }));
    };
    ApiCallService.prototype.uploadImageFromBlob = function (blob, filename, weight, fat_percent, comment, type) {
        var _this = this;
        this.presentLoading();
        //should be always authenticated call
        var formData = new FormData();
        formData.append("action", "saveImage");
        formData.append("token", localStorage.getItem("token"));
        formData.append("user_id", localStorage.getItem("user_id"));
        formData.append("date", this.globalservice.getTodayDate());
        formData.append("weight", weight);
        formData.append("fat_percent", fat_percent);
        formData.append("comment", comment);
        formData.append("type", type);
        formData.append('uploadFile', blob);
        formData.append('filename', filename);
        return this.http.post(environment.API_URL + "image_upload.php", formData)
            .pipe(map(function (results) {
            _this.dismissLoading();
            return results;
        }), catchError(function (error) {
            _this.dismissLoading();
            _this.showError(error);
            return throwError(error);
        }));
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
        else {
            this.presentToastWithOptions(error);
        }
    };
    ApiCallService.prototype.presentToastWithOptions = function (message) {
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
    ApiCallService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, LoadingController, AlertController, Router,
            GlobalServicesService, ToastController])
    ], ApiCallService);
    return ApiCallService;
}());
export { ApiCallService };
//# sourceMappingURL=api-call.service.js.map