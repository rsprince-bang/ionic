import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';

@Injectable({
  providedIn: 'root'
})
export class GlobalServicesService {

  constructor(private router: Router, private nativePageTransitions: NativePageTransitions) { }

  isLoggedIn(){
    let token = localStorage.getItem('token');
    if (token){
      return true;
    }
    else{
      return false;
    }
  }


  logOut(){
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }


  swipeLeft( url:string) {
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
      slowdownfactor: -1
    }
    this.nativePageTransitions.slide(options);
    this.router.navigateByUrl(url);
  }

  swipeRight( url ) {
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 400,
      slowdownfactor: -1
    }
    this.nativePageTransitions.slide(options);
    this.router.navigateByUrl(url);
  }


  hasDailyCaloriesIntake(){
    let dailyCaloriesIntake = localStorage.getItem('dailyCaloriesIntake');
    if (dailyCaloriesIntake){
      return true;
    }
    else{
      return false;
    }
  }
}
