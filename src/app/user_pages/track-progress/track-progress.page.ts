import { Component, OnInit } from '@angular/core';
//import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ApiCallService } from 'src/app/services/api-call.service';
import { GlobalServicesService } from 'src/app/services/global-services.service';
import { ModalController } from '@ionic/angular';
import { AddPhotoModalPage } from '../add-photo-modal/add-photo-modal.page';
import { environment } from 'src/environments/environment';


declare let window: any; // <--- Declare it like this

@Component({
  selector: 'app-track-progress',
  templateUrl: './track-progress.page.html',
  styleUrls: ['./track-progress.page.scss'],
})
export class TrackProgressPage implements OnInit {

  items = [];
  images = [];
  sliderOpts = {
    zoom: false,
    slidesPerView: 1.5,
    spaceBetween: 20,
    centeredSlides: true
  };

  constructor(private myAPI: ApiCallService, private globalServices: GlobalServicesService, private modalController: ModalController) { }

  ngOnInit() {
    this.loadImages();
  }


  loadImages() {
    this.myAPI.makeAPIcall(
      "images.php",
      {
        "action": "loadImages"
      },
      true
    ).subscribe((result) => {
      if (result.error) {
        this.myAPI.handleMyAPIError(result.error);
      }
      else {
        this.images = result.success.images;
        for (var i = 0; i < this.images.length; i++) {
          this.images[i].url = environment.API_URL + this.images[i].url;
          this.images[i].human_date = this.globalServices.getDateAsHumanString(this.images[i].date_uploaded);
        }
      }
    });
  }


  async openPhotoModal() {
    const modal = await this.modalController.create({
      component: AddPhotoModalPage,
      componentProps: {}
    });

    modal.onDidDismiss()
      .then((response) => {
        if (response.data) {
          this.loadImages();
        }
      });

    return await modal.present();
  }


  deleteImage(imgID) {
    this.myAPI.makeAPIcall(
      "images.php",
      {
        "action": "deleteImage",
        "imgID": imgID
      },
      true
    ).subscribe((result) => {
      if (result.error) {
        this.myAPI.handleMyAPIError(result.error);
      }
      else {
        this.loadImages();
      }
    });
  }





}
