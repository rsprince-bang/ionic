import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { GlobalServicesService } from './global-services.service';


@Injectable({
  providedIn: 'root'
})


export class ApiCallService {

  private headers = new HttpHeaders({
    //'Content-Type': 'application/json'  //this one is default
    //'Content-Type': 'application/x-www-form-urlencoded'
  });
  private options = { headers: this.headers };

  private loading = null;
  isLoading = false;

  constructor(private http: HttpClient, public loadingController: LoadingController, private alertController: AlertController, private router: Router,
    private globalservice: GlobalServicesService, public toastController: ToastController) { }


  makeAPIcall(page, data, auth_needed = false): Observable<any> {

    if (auth_needed) {
      data.token = localStorage.getItem("token");
      data.user_id = localStorage.getItem("user_id");
    }

    this.presentLoading();

    return this.http.post(
      environment.API_URL + page,
      JSON.stringify(data),
      this.options
    ).pipe(
      map(results => {
        this.dismissLoading();
        return results;
      }),
      catchError(error => {
        this.dismissLoading();
        this.showError(error);
        return throwError(error);
      })
    );

  }


  makeSilentCall(page, data, auth_needed = false) {

    if (auth_needed) {
      data.token = localStorage.getItem("token");
      data.user_id = localStorage.getItem("user_id");
    }

    this.http.post(
      environment.API_URL + page,
      JSON.stringify(data),
      this.options
    ).subscribe(() => {
      //do nothing
    });
  }


  async presentLoading() {
    this.isLoading = true;
    return await this.loadingController.create({
      spinner: "lines",
      animated: true,
      backdropDismiss: false,
      cssClass: 'custom-class custom-loading',
      duration: null,
      keyboardClose: true,
      message: 'Please wait...',
      translucent: true,
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss().then(() => {
          });
        }
      });
    });
  }

  async dismissLoading() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => {
    });
  }

  uploadImageFromFile(file: File, weight, fat_percent, comment): Observable<any> {
    this.presentLoading();
    //should be always authenticated call
    const formData = new FormData();
    formData.append("action", "saveImage" );
    formData.append("token", localStorage.getItem("token") );
    formData.append("user_id", localStorage.getItem("user_id") );
    formData.append("date", this.globalservice.getTodayDate() );
    formData.append("weight", weight );
    formData.append("fat_percent", fat_percent );
    formData.append("comment", comment );

    formData.append('uploadFile', file, file.name);

    return this.http.post(environment.API_URL + "image_upload.php", formData)
      .pipe(
        map(results => {
          this.dismissLoading();
          return results;
        }),
        catchError(error => {
          this.dismissLoading();
          this.showError(error);
          return throwError(error);
        })
    );
  }

  uploadImageFromBlob(blob: Blob, filename, weight, fat_percent, comment): Observable<any> {
    this.presentLoading();
    //should be always authenticated call
    const formData = new FormData();
    formData.append("action", "saveImage" );
    formData.append("token", localStorage.getItem("token") );
    formData.append("user_id", localStorage.getItem("user_id") );
    formData.append("date", this.globalservice.getTodayDate() );
    formData.append("weight", weight );
    formData.append("fat_percent", fat_percent );
    formData.append("comment", comment );

    formData.append('uploadFile', blob);
    formData.append('filename', filename);

    return this.http.post(environment.API_URL + "image_upload.php", formData)
      .pipe(
        map(results => {
          this.dismissLoading();
          return results;
        }),
        catchError(error => {
          this.dismissLoading();
          this.showError(error);
          return throwError(error);
        })
    );
  }

  async showError(error) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'We were unable handle your request, please try again later with better Wi-Fi connection.',
      buttons: ['OK']
    });

    await alert.present();
  }


  handleMyAPIError(error) {
    if (error == "Expired token") {
      this.globalservice.logOut();
    }
    else{
      this.presentToastWithOptions(error);
    }
  }

  async presentToastWithOptions(message) {
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'OK',
      duration: 3000,
      translucent: false
    });
    toast.present();
  }
}
