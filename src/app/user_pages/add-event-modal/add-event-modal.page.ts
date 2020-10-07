import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.page.html',
  styleUrls: ['./add-event-modal.page.scss'],
})
export class AddEventModalPage implements OnInit {
  searchTerm: string;
  constructor(public modalController: ModalController,public router:Router) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }



  sendData() {
    console.log(this.searchTerm);
  }

}
