import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', loadChildren: './public_pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './public_pages/register/register.module#RegisterPageModule' },
  { path: 'forgot-password', loadChildren: './public_pages/forgot-password/forgot-password.module#ForgotPasswordPageModule' },

  
  { path: 'home', loadChildren: './user_pages/tabs/tabs.module#TabsPageModule', canActivate:[AuthGuard] },
  { path: 'track', loadChildren: './user_pages/track/track.module#TrackPageModule', canActivate:[AuthGuard] },
  { path: 'track-meal', loadChildren: './user_pages/track-meal/track-meal.module#TrackMealPageModule', canActivate:[AuthGuard] },
  { path: 'track-workout', loadChildren: './user_pages/track-workout/track-workout.module#TrackWorkoutPageModule', canActivate:[AuthGuard] },
  { path: 'track-progress', loadChildren: './user_pages/track-progress/track-progress.module#TrackProgressPageModule', canActivate:[AuthGuard] }
  

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
