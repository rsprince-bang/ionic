import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      // { path: 'home/today', loadChildren: './home/home.module#HomePageModule', canActivate:[AuthGuard] },
      { path: 'home', loadChildren: '../home/home.module#HomePageModule', canActivate:[AuthGuard] },
      { path: 'home/:day', loadChildren: '../home/home.module#HomePageModule', canActivate:[AuthGuard] },

      { path: 'track-meal', loadChildren: '../track-meal/track-meal.module#TrackMealPageModule', canActivate:[AuthGuard] },
      { path: 'track-meal/:day', loadChildren: '../track-meal/track-meal.module#TrackMealPageModule', canActivate:[AuthGuard] },

      { path: 'track-workout', loadChildren: '../track-workout/track-workout.module#TrackWorkoutPageModule', canActivate:[AuthGuard] },
      { path: 'track-workout/:day', loadChildren: '../track-workout/track-workout.module#TrackWorkoutPageModule', canActivate:[AuthGuard] },

      { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule',  canActivate:[AuthGuard] }, 
      { path: '', redirectTo: 'tabs/home', pathMatch: 'full'}, 
      
      // { path: 'track-progress', loadChildren: '../../user_pages/track-progress/track-progress.module#TrackProgressPageModule', canActivate:[AuthGuard] },
      // { path: 'alerts', loadChildren: '../../user_pages/alerts/alerts.module#AlertsPageModule', canActivate:[AuthGuard] },
      // { path: 'calendar', loadChildren: '../../user_pages/calendar/calendar.module#CalendarPageModule', canActivate:[AuthGuard] },  
    ]
  },
  { path: '', redirectTo: 'tabs/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
