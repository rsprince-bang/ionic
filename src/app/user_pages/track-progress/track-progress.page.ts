import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ApiCallService } from 'src/app/services/api-call.service';
import { GlobalServicesService } from 'src/app/services/global-services.service';

declare let window: any; // <--- Declare it like this

@Component({
  selector: 'app-track-progress',
  templateUrl: './track-progress.page.html',
  styleUrls: ['./track-progress.page.scss'],
})
export class TrackProgressPage implements OnInit {

  items = [];
  currentImage: any;
  testImageURL = "";
  file: File;

  constructor(private camera: Camera, private myAPI: ApiCallService, private globalServices: GlobalServicesService) { }

  ngOnInit() {
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
            self.myAPI.uploadImageFromBlob(imgBlob, file.name)
              .subscribe((result) => {
                if (result.error) {
                  self.myAPI.handleMyAPIError(result.error);
                }
                else {
                  alert(JSON.stringify(result));
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



  //upload file
  changeListener($event): void {
    this.myAPI.uploadImageFromFile($event.target.files[0])
      .subscribe((result) => {
        if (result.error) {
          this.myAPI.handleMyAPIError(result.error);
        }
        else {
          alert(JSON.stringify(result));
        }
      });
  }




}
