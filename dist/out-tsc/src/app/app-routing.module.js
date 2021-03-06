import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
var routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', loadChildren: './public_pages/login/login.module#LoginPageModule' },
    { path: 'register', loadChildren: './public_pages/register/register.module#RegisterPageModule' },
    { path: 'forgot-password', loadChildren: './public_pages/forgot-password/forgot-password.module#ForgotPasswordPageModule' },
    //{ path: 'home', loadChildren: './user_pages/tabs/tabs.module#TabsPageModule', canActivate:[AuthGuard] },
    //{ path: 'track', loadChildren: './user_pages/track/track.module#TrackPageModule', canActivate:[AuthGuard] },
    { path: 'track-meal/:day', loadChildren: './user_pages/track-meal/track-meal.module#TrackMealPageModule', canActivate: [AuthGuard] },
    { path: 'track-workout/:day', loadChildren: './user_pages/track-workout/track-workout.module#TrackWorkoutPageModule', canActivate: [AuthGuard] },
    { path: 'track-progress', loadChildren: './user_pages/track-progress/track-progress.module#TrackProgressPageModule', canActivate: [AuthGuard] },
    { path: 'alerts', loadChildren: './user_pages/alerts/alerts.module#AlertsPageModule', canActivate: [AuthGuard] },
    { path: 'enter-measurements', loadChildren: './user_pages/enter-measurements/enter-measurements.module#EnterMeasurementsPageModule', canActivate: [AuthGuard] },
    { path: 'home/:day', loadChildren: './user_pages/home/home.module#HomePageModule', canActivate: [AuthGuard] },
    { path: 'calendar', loadChildren: './user_pages/calendar/calendar.module#CalendarPageModule', canActivate: [AuthGuard] },
    { path: 'profile', loadChildren: './user_pages/profile/profile.module#ProfilePageModule', canActivate: [AuthGuard] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map