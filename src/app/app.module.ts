import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AlertsPickerModalPageModule } from './user_pages/alerts-picker-modal/alerts-picker-modal.module';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
     IonicModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
      AlertsPickerModalPageModule
    ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NativePageTransitions,
    LocalNotifications
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
