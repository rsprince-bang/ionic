import { Component } from '@angular/core';

import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


import { Router } from '@angular/router';
import { ApiCallService } from './services/api-call.service';
import { GlobalServicesService } from './services/global-services.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {

  private loggedin = false; //a flag used to show the Logout button in menu

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private ApiCallService: ApiCallService,
    private router: Router,
    private globalservice: GlobalServicesService,
    public events: Events
  ) {
    this.initializeApp();
    this.events.subscribe( 'user logged in', (a, b)=> {
      //console.log('Welcome', a, 'at', b);
      this.loggedin = true;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //maybe check if token is valid
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if( this.globalservice.isLoggedIn() ){
        this.loggedin = true;
        let goals = localStorage.getItem("goals");
        let measurements = localStorage.getItem("measurements");

        if( !goals ){
          this.router.navigateByUrl("/welcome");
        }
        else if( !measurements ){
          this.router.navigateByUrl("/enter-measurements");
        }
        else{
          this.router.navigateByUrl("tabs/home/today");
        }
      } 
      else {
        this.loggedin = false;
        this.router.navigateByUrl("login");
      }

    });
  }

  logout(){

    this.loggedin = false;
    this.globalservice.logOut();
  }
}
