import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { ApiCallService } from './services/api-call.service';
import { GlobalServicesService } from './services/global-services.service';
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, splashScreen, statusBar, ApiCallService, router, globalservice, events) {
        var _this = this;
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.ApiCallService = ApiCallService;
        this.router = router;
        this.globalservice = globalservice;
        this.events = events;
        this.loggedin = false; //a flag used to show the Logout button in menu
        this.initializeApp();
        this.events.subscribe('user logged in', function (a, b) {
            //console.log('Welcome', a, 'at', b);
            _this.loggedin = true;
        });
    }
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            //maybe check if token is valid
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            if (_this.globalservice.isLoggedIn()) {
                _this.loggedin = true;
                _this.router.navigateByUrl("/home/today");
            }
        });
    };
    AppComponent.prototype.logout = function () {
        this.loggedin = false;
        this.globalservice.logOut();
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [Platform,
            SplashScreen,
            StatusBar,
            ApiCallService,
            Router,
            GlobalServicesService,
            Events])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map