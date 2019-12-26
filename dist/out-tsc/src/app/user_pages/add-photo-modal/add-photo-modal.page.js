import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms'; //in order to use forms I had to import "ReactiveFormsModule" in this page's module
import { ApiCallService } from 'src/app/services/api-call.service';
import { Camera } from '@ionic-native/camera/ngx';
var AddPhotoModalPage = /** @class */ (function () {
    function AddPhotoModalPage(modalController, formBuilder, myAPI, camera) {
        this.modalController = modalController;
        this.formBuilder = formBuilder;
        this.myAPI = myAPI;
        this.camera = camera;
    }
    AddPhotoModalPage.prototype.ngOnInit = function () {
        this.photoForm = this.formBuilder.group({
            weight: ['', [Validators.required, Validators.pattern('[0-9]+')]],
            fatpercent: ['', [Validators.pattern('[0-9]+')]],
            comment: ['']
        });
    };
    AddPhotoModalPage.prototype.cancelModal = function () {
        this.modalController.dismiss();
    };
    //upload file
    AddPhotoModalPage.prototype.uploadPicture = function ($event) {
        var _this = this;
        this.myAPI.uploadImageFromFile($event.target.files[0], this.photoForm.value.weight, this.photoForm.value.fatpercent, this.photoForm.value.comment, "progress")
            .subscribe(function (result) {
            if (result.error) {
                _this.myAPI.handleMyAPIError(result.error);
            }
            else {
                _this.modalController.dismiss(result);
            }
        });
    };
    AddPhotoModalPage.prototype.takePicture = function () {
        var _this = this;
        var options = {
            quality: 70,
            sourceType: this.camera.PictureSourceType.CAMERA,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            window.resolveLocalFileSystemURL(imageData, function (fileEntry) {
                fileEntry.file(function (file) {
                    var self = _this;
                    var reader = new FileReader();
                    reader.onloadend = function (e) {
                        var imgBlob = new Blob([this.result], { type: "image/jpeg" });
                        self.myAPI.uploadImageFromBlob(imgBlob, file.name, self.photoForm.value.weight, self.photoForm.value.fatpercent, self.photoForm.value.comment, "progress")
                            .subscribe(function (result) {
                            if (result.error) {
                                self.myAPI.handleMyAPIError(result.error);
                            }
                            else {
                                self.modalController.dismiss(result);
                            }
                        });
                    };
                    reader.readAsArrayBuffer(file);
                });
            });
        }, function (err) {
            // Handle error
            console.log("Camera issue:" + err);
        });
    };
    AddPhotoModalPage = tslib_1.__decorate([
        Component({
            selector: 'app-add-photo-modal',
            templateUrl: './add-photo-modal.page.html',
            styleUrls: ['./add-photo-modal.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController, FormBuilder, ApiCallService, Camera])
    ], AddPhotoModalPage);
    return AddPhotoModalPage;
}());
export { AddPhotoModalPage };
//# sourceMappingURL=add-photo-modal.page.js.map