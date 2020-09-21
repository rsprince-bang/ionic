import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EnterMeasurementsPage } from './enter-measurements.page';

const routes: Routes = [
  {
    path: 'enter-measurements',
    component: EnterMeasurementsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [EnterMeasurementsPage]
})
export class EnterMeasurementsPageModule {}
