import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

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

  constructor(private http: HttpClient, public loadingController: LoadingController) { }


  makeAPIcall(page, data, auth_needed=false): Observable<any>{

    /*
    if(auth_needed){
      let token = localStorage.getItem("token");
      console.log(token);
      if (token){
        data.token = token;
      }
      else{
        //return false;
      }
    }*/

    this.presentLoadingWithOptions();

    return this.http.post(
      environment.API_URL + page,
      JSON.stringify(data),
      this.options
    ).pipe(
      map(results => {
        this.loading.dismiss();
        return results;
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





}
