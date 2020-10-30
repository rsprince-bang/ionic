import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiCallService } from 'src/app/services/api-call.service';

@Component({
  selector: 'app-add-sleep-modal',
  templateUrl: './add-sleep-modal.page.html',
  styleUrls: ['./add-sleep-modal.page.scss'],
})
export class AddSleepModalPage implements OnInit {
  sleepAmount: number = 0;
	sleep = {intake: 15, recommended: 60 };

  constructor(
    public modalController: ModalController,
    private myAPI: ApiCallService
  ) { }

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
    // this.updateSleep();
  }
  
  	// update water intake
	updateSleep() {
		this.myAPI.makeAPIcall(
			"sleep",
			{
				"action": "saveSleep",
				"waterAmount": this.sleepAmount
			},
			true
		)
		.subscribe(
			response => {
				// handle error
				if( response.error ){
					this.myAPI.handleMyAPIError(response.error);
				}
			},
			error => console.log(error)
		)
	}

}
