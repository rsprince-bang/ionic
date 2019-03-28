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
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AlertsPickerModalPageModule } from './user_pages/alerts-picker-modal/alerts-picker-modal.module';
import { TrackWorkoutModalPageModule } from './user_pages/track-workout-modal/track-workout-modal.module';
import { HomeAddFoodModalPageModule } from './user_pages/home-add-food-modal/home-add-food-modal.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
     IonicModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
      AlertsPickerModalPageModule,
      TrackWorkoutModalPageModule,
      HomeAddFoodModalPageModule,
      HomeAddFoodModalPageModule
    ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NativePageTransitions,
    LocalNotifications,
    InAppBrowser
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
