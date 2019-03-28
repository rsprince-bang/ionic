import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomeAddFoodModalPage } from './home-add-food-modal.page';

const routes: Routes = [
  {
    path: '',
    component: HomeAddFoodModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomeAddFoodModalPage]
})
export class HomeAddFoodModalPageModule {}
