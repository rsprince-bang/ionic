import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.page.html',
  styleUrls: ['./add-event-modal.page.scss'],
})
export class AddEventModalPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
