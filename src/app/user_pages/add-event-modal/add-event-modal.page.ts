import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/services/api-call.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.page.html',
  styleUrls: ['./add-event-modal.page.scss'],
})
export class AddEventModalPage implements OnInit {
  searchTerm: string;
  searchResults = [];
  today = new Date();
	date = this.datePipe.transform(this.today, 'yyyy-MM-dd');
  
  constructor(
    public modalController: ModalController,
    public router:Router,
    private myAPI: ApiCallService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }

  searchMeals() {
    this.myAPI.makeAPIcall(
			"food_api_nutritionix",
			{
        "action": "loadFoods",
        "food": this.searchTerm
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
					this.searchResults = data;
				}
			},
			error => console.log(error)
		)
  }

  addMeal(item){
    this.myAPI.makeAPIcall( // old version used .makeSilentcall() ?
      "food_api_nutritionix", 
      {
        "action": "nutritionixAddMeal",
        "foods": item,
        "day": this.date
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
          console.log("Meal Added...");
          this.modalController.dismiss(item);
				}
			},
			error => console.log(error)
		);
  }

  sendData() {
    console.log(this.searchTerm);
  }

}
