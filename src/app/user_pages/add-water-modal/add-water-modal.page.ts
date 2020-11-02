import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiCallService } from 'src/app/services/api-call.service';

@Component({
  selector: 'app-add-water-modal',
  templateUrl: './add-water-modal.page.html',
  styleUrls: ['./add-water-modal.page.scss'],
})
export class AddWaterModalPage implements OnInit {
	waterAmount = 0;
	water = {intake: 15, recommended: 60 };
	today = new Date();
	date = this.datePipe.transform(this.today, 'yyyy-MM-dd');

  constructor(
		public modalController: ModalController,
		private myAPI: ApiCallService,
		private datePipe: DatePipe
	) { }

  ngOnInit() {
		this.getCurrentWaterIntake();
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
		this.updateWaterIntake();
	}

	// gets current water intake
	getCurrentWaterIntake() {
		this.myAPI.makeAPIcall(
			"water-intake",
			{
				"action": "loadWater",
				"date": this.date
			},
			true
		)
		.subscribe(
			response => {
				// handle error
				if( response.error ){
					this.myAPI.handleMyAPIError(response.error);
				} 
				// successful response
				else {
					let data = response.success;
					this.water.intake = data.todaysIntake;
					this.water.recommended = data.recommended;
					console.log("Water: ", this.water.intake, this.water.recommended);
				}
			},
			error => console.log(error)
		)
	}

	// update water intake
	updateWaterIntake() {
		this.myAPI.makeAPIcall(
			"water-intake",
			{
				"action": "saveWaterIntake",
				"date": this.date,
				"waterAmount": this.waterAmount
			},
			true
		)
		.subscribe(
			response => {
				// handle error
				if( response.error ){
					this.myAPI.handleMyAPIError(response.error);
				}
				else {
					let data = response.success;
					this.water.intake = data.todaysIntake;
					console.log("New Intake: ", this.water.intake);
				}
			},
			error => console.log(error)
		)
	}

}
