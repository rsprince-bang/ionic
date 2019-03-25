import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TrackWorkoutModalPage } from './track-workout-modal.page';

const routes: Routes = [
  {
    path: '',
    component: TrackWorkoutModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TrackWorkoutModalPage]
})
export class TrackWorkoutModalPageModule {}
