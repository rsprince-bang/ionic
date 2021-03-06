import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

  { path: '', loadChildren: './user_pages/tabs/tabs.module#TabsPageModule', canActivate:[AuthGuard] },

  //public paths
  { path: 'login', loadChildren: './public_pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './public_pages/register/register.module#RegisterPageModule' },
  { path: 'terms', loadChildren: './public_pages/policies/policies.module#PoliciesPageModule' },
  { path: 'forgot-password', loadChildren: './public_pages/forgot-password/forgot-password.module#ForgotPasswordPageModule' },

  { path: 'welcome', loadChildren: './public_pages/welcome/welcome.module#WelcomePageModule', canActivate:[AuthGuard] },
  { path: 'set-goals', loadChildren: './user_pages/set-goals/set-goals.module#SetGoalsPageModule',  canActivate:[AuthGuard] },
  { path: 'add-event-modal', loadChildren: './user_pages/add-event-modal/add-event-modal.module#AddEventModalPageModule' },
  { path: 'enter-measurements', loadChildren: './user_pages/enter-measurements/enter-measurements.module#EnterMeasurementsPageModule', canActivate:[AuthGuard] },
  { path: 'home-add', loadChildren:'./user_pages/home-add-food-modal/home-add-food-modal.module#HomeAddFoodModalPageModule', canActivate:[AuthGuard]},
  { path: 'policies', loadChildren: './public_pages/policies/policies.module#PoliciesPageModule' },
  { path: 'reset-password', loadChildren: './user_pages/reset-password/reset-password.module#ResetPasswordPageModule'  },
  { path: 'add-water-modal', loadChildren: './user_pages/add-water-modal/add-water-modal.module#AddWaterModalPageModule' },
  { path: 'add-sleep-modal', loadChildren: './user_pages/add-sleep-modal/add-sleep-modal.module#AddSleepModalPageModule' },
  { path: 'reset-diet', loadChildren: './user_pages/reset-diet/reset-diet.module#ResetDietPageModule' },
  { path: 'settings', loadChildren: './user_pages/settings/settings.module#SettingsPageModule' },  { path: 'user-info', loadChildren: './user_pages/user-info/user-info.module#UserInfoPageModule' },
  { path: 'privacy', loadChildren: './public_pages/privacy/privacy.module#PrivacyPageModule' },
  { path: 'calorie-ratio', loadChildren: './public_pages/calorie-ratio/calorie-ratio.module#CalorieRatioPageModule' },
  { path: 'weighin-modal', loadChildren: './user_pages/weighin-modal/weighin-modal.module#WeighinModalPageModule' }





];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
