import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TrackMealPage } from './track-meal.page';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ChartsModule } from 'ng2-charts';

const routes: Routes = [
  {
    path: '',
    component: TrackMealPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgCircleProgressModule.forRoot({
      "radius": 60,
      "maxPercent": 100,
      "unitsColor": "#ffffff",
      "outerStrokeWidth": 5,
      "outerStrokeColor": "#FFFFFF",
      "innerStrokeColor": "#FFFFFF",
      "titleColor": "#ffffff",
      "subtitleColor": "#ffffff",
      "showInnerStroke": false,
      "startFromZero": false,
      "showZeroOuterStroke": false
    }),
    ChartsModule
  ],
  declarations: [TrackMealPage]
})
export class TrackMealPageModule {}
