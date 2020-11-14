import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WeighinModalPage } from './modal-root/weighin-modal.page';
import { BodyFatInfoComponent } from './body-fat-info/body-fat-info/body-fat-info.component';
import { WeighinMainComponent } from './weighin-main/weighin-main.component';

const routes: Routes = [
  {
    path: '',
    component: WeighinModalPage
  },
  {
    path: 'body-fat-info',
    component: BodyFatInfoComponent
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
  declarations: [
    WeighinModalPage,
    WeighinMainComponent,
    BodyFatInfoComponent
  ],
  entryComponents: [WeighinModalPage, WeighinMainComponent, BodyFatInfoComponent]
})
export class WeighinModalPageModule {}
