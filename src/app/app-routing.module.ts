import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  //public paths
  { path: 'login', loadChildren: './public_pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './public_pages/register/register.module#RegisterPageModule' },
  { path: 'forgot-password', loadChildren: './public_pages/forgot-password/forgot-password.module#ForgotPasswordPageModule' },

  //private paths, i.e. user needs to be logged in
  //{ path: 'home', loadChildren: './user_pages/tabs/tabs.module#TabsPageModule', canActivate:[AuthGuard] },
  //{ path: 'track', loadChildren: './user_pages/track/track.module#TrackPageModule', canActivate:[AuthGuard] },
  { path: 'track-meal/:day', loadChildren: './user_pages/track-meal/track-meal.module#TrackMealPageModule', canActivate:[AuthGuard] },
  { path: 'track-workout/:day', loadChildren: './user_pages/track-workout/track-workout.module#TrackWorkoutPageModule', canActivate:[AuthGuard] },
  { path: 'track-progress', loadChildren: './user_pages/track-progress/track-progress.module#TrackProgressPageModule', canActivate:[AuthGuard] },
  { path: 'alerts', loadChildren: './user_pages/alerts/alerts.module#AlertsPageModule', 
 },
  { path: 'enter-measurements', loadChildren: './user_pages/enter-measurements/enter-measurements.module#EnterMeasurementsPageModule'},
  { path: 'home/:day', loadChildren: './user_pages/home/home.module#HomePageModule', canActivate:[AuthGuard] },
  { path: 'calendar', loadChildren: './user_pages/calendar/calendar.module#CalendarPageModule', canActivate:[AuthGuard] },
  { path: 'profile', loadChildren: './user_pages/profile/profile.module#ProfilePageModule',  canActivate:[AuthGuard] },
  { path: 'welcome', loadChildren: './public_pages/welcome/welcome.module#WelcomePageModule', canActivate:[AuthGuard] },
  { path: 'set-goals', loadChildren: './user_pages/set-goals/set-goals.module#SetGoalsPageModule',  canActivate:[AuthGuard] },
  {path:'home-add', loadChildren:'./user_pages/home-add-food-modal/home-add-food-modal.module#HomeAddFoodModalPageModule'}






  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
