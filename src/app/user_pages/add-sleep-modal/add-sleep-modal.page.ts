import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-sleep-modal',
  templateUrl: './add-sleep-modal.page.html',
  styleUrls: ['./add-sleep-modal.page.scss'],
})
export class AddSleepModalPage implements OnInit {
  sleepAmount: number = 0;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }

  incrementCounter() {
		this.sleepAmount++;
	}

	decrementCounter() {
		this.sleepAmount--;
	}

	sendData() {
		console.log(this.sleepAmount);
	}

}
