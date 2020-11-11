import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

import { IonicModule } from '@ionic/angular';

import { CalorieRatioPage } from './calorie-ratio.page';

const routes: Routes = [
  {
    path: '',
    component: CalorieRatioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ChartsModule
  ],
  declarations: [CalorieRatioPage]
})
export class CalorieRatioPageModule {}
