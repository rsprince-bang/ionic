import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
//import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ApiCallService } from 'src/app/services/api-call.service';
import { GlobalServicesService } from 'src/app/services/global-services.service';
import { ModalController } from '@ionic/angular';
import { AddPhotoModalPage } from '../add-photo-modal/add-photo-modal.page';
import { environment } from 'src/environments/environment';
var TrackProgressPage = /** @class */ (function () {
    function TrackProgressPage(myAPI, globalServices, modalController) {
        this.myAPI = myAPI;
        this.globalServices = globalServices;
        this.modalController = modalController;
        this.items = [];
        this.images = [];
        this.sliderOpts = {
            zoom: false,
            slidesPerView: 1.5,
            spaceBetween: 20,
            centeredSlides: true
        };
    }
    TrackProgressPage.prototype.ngOnInit = function () {
        this.loadImages();
    };
    TrackProgressPage.prototype.loadImages = function () {
        var _this = this;
        this.myAPI.makeAPIcall("images.php", {
            "action": "loadImages"
        }, true).subscribe(function (result) {
            if (result.error) {
                _this.myAPI.handleMyAPIError(result.error);
            }
            else {
                _this.images = result.success.images;
                for (var i = 0; i < _this.images.length; i++) {
                    _this.images[i].url = environment.API_URL + _this.images[i].url;
                    _this.images[i].human_date = _this.globalServices.getDateAsHumanString(_this.images[i].date_uploaded);
                }
            }
        });
    };
    TrackProgressPage.prototype.openPhotoModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: AddPhotoModalPage,
                            componentProps: {}
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (response) {
                            if (response.data) {
                                _this.loadImages();
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TrackProgressPage.prototype.deleteImage = function (imgID) {
        var _this = this;
        this.myAPI.makeAPIcall("images.php", {
            "action": "deleteImage",
            "imgID": imgID
        }, true).subscribe(function (result) {
            if (result.error) {
                _this.myAPI.handleMyAPIError(result.error);
            }
            else {
                _this.loadImages();
            }
        });
    };
    TrackProgressPage = tslib_1.__decorate([
        Component({
            selector: 'app-track-progress',
            templateUrl: './track-progress.page.html',
            styleUrls: ['./track-progress.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ApiCallService, GlobalServicesService, ModalController])
    ], TrackProgressPage);
    return TrackProgressPage;
}());
export { TrackProgressPage };
//# sourceMappingURL=track-progress.page.js.map