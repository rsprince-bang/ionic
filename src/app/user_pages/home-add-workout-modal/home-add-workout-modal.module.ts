import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomeAddWorkoutModalPage } from './home-add-workout-modal.page';

const routes: Routes = [
  {
    path: '',
    component: HomeAddWorkoutModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomeAddWorkoutModalPage]
})
export class HomeAddWorkoutModalPageModule {}
