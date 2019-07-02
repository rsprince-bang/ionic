import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; //in order to use forms I had to import "ReactiveFormsModule" in this page's module
import { ApiCallService } from 'src/app/services/api-call.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare let window: any; // <--- Declare it like this

@Component({
  selector: 'app-add-photo-modal',
  templateUrl: './add-photo-modal.page.html',
  styleUrls: ['./add-photo-modal.page.scss'],
})
export class AddPhotoModalPage implements OnInit {

  photoForm: FormGroup;
  
  constructor(private modalController: ModalController, private formBuilder: FormBuilder, private myAPI: ApiCallService, private camera: Camera) { }

  ngOnInit() {
    this.photoForm = this.formBuilder.group({
      weight: ['', [ Validators.required, Validators.pattern('[0-9]+') ]],
      fatpercent: ['', [ Validators.required, Validators.pattern('[0-9]+') ]],
      comment:['']
    });
  }

  cancelModal(){
    this.modalController.dismiss();
  }

  //upload file
  uploadPicture($event): void {
    this.myAPI.uploadImageFromFile($event.target.files[0], this.photoForm.value.weight, this.photoForm.value.fatpercent, this.photoForm.value.comment)
      .subscribe((result) => {
        if (result.error) {
          this.myAPI.handleMyAPIError(result.error);
        }
        else {
          this.modalController.dismiss(result);
        }
      });
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 70, //1-100
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      window.resolveLocalFileSystemURL(imageData, (fileEntry) => {
        fileEntry.file((file) => {
          let self = this;
          var reader = new FileReader();
          reader.onloadend = function (e) {
            var imgBlob = new Blob([this.result], { type: "image/jpeg" });
            self.myAPI.uploadImageFromBlob(imgBlob, file.name, self.photoForm.value.weight, self.photoForm.value.fatpercent, this.photoForm.value.comment)
              .subscribe((result) => {
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
    }, (err) => {
      // Handle error
      console.log("Camera issue:" + err);
    });
  }


}
