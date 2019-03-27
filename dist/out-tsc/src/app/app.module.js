import * as tslib_1 from "tslib";
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
import { TrackWorkoutModalPageModule } from './user_pages/track-workout-modal/track-workout-modal.module';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [AppComponent],
            entryComponents: [],
            imports: [
                BrowserModule,
                IonicModule.forRoot(),
                AppRoutingModule,
                HttpClientModule,
                AlertsPickerModalPageModule,
                TrackWorkoutModalPageModule
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
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map