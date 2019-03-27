import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController, AlertController } from '@ionic/angular';
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

  constructor(private http: HttpClient, public loadingController: LoadingController, private alertController: AlertController, private router: Router,
    private globalservice: GlobalServicesService ) { }


  makeAPIcall(page, data, auth_needed=false): Observable<any>{

    if(auth_needed){
      data.token = localStorage.getItem("token");
      data.user_id = localStorage.getItem("user_id");
    }

    this.presentLoadingWithOptions();

    return this.http.post(
      environment.API_URL + page,
      JSON.stringify(data),
      this.options
    ).pipe(
      map(results => {
        this.loading.dismiss();
        return results;
      }),
      catchError(error => {
        this.showError(error);

        this.loading.dismiss();
        return throwError(error);
      })
    );
    
  }


  async presentLoadingWithOptions() {
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
  }


  async showError(error) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'We were unable handle your request, please try again later with better Wi-Fi connection.',
      buttons: ['OK']
    });

    await alert.present();
  }


  handleMyAPIError(error){
    if(error == "Expired token"){
      this.globalservice.logOut();
    }
  }


}
