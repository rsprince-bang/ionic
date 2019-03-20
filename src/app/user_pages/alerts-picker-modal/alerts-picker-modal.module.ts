import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AlertsPickerModalPage } from './alerts-picker-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AlertsPickerModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AlertsPickerModalPage]
})
export class AlertsPickerModalPageModule {}
