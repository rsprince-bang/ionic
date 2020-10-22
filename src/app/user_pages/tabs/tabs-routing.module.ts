import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home/:day',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'track-meal',
        children: [
          {
            path: '',
            loadChildren: '../track-meal/track-meal.module#TrackMealPageModule'
          }
        ]
      },
      {
        path: 'track-workout',
        children: [
          {
            path: '',
            loadChildren: '../track-workout/track-workout.module#TrackWorkoutPageModule'
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: '../profile/profile.module#ProfilePageModule'
          }
        ]
      },
    ]
  },

  { path: '', redirectTo: 'tabs/home', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
