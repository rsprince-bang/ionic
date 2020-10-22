import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { TrackWorkoutPage } from './track-workout.page';

const routes: Routes = [
  {
    path: '',
    component: TrackWorkoutPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgCircleProgressModule
  ],
  declarations: [TrackWorkoutPage]
})
export class TrackWorkoutPageModule {}
