import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddEventModalPage } from '../add-event-modal/add-event-modal.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})


export class TabsPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    // this.dismiss();
  }

  async openModal() {
    const modal = await this.modalController.create({component: AddEventModalPage});
    return await modal.present();
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
