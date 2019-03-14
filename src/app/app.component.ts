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

  private loggedin = false;

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
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if( this.globalservice.isLoggedIn() ){
        this.loggedin = true;
        this.router.navigateByUrl("/home/tabs/tab2");
      }


    });
  }

  logout(){
    localStorage.removeItem("token");
    this.loggedin = false;
    this.router.navigateByUrl("/login");
  }
}
