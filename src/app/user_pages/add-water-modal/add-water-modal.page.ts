import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-water-modal',
  templateUrl: './add-water-modal.page.html',
  styleUrls: ['./add-water-modal.page.scss'],
})
export class AddWaterModalPage implements OnInit {
	waterAmount: number = 0;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
	}
	
	incrementCounter() {
		this.waterAmount++;
	}

	decrementCounter() {
		this.waterAmount--;
	}

	sendData() {
		console.log(this.waterAmount);
	}

}
