import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/services/api-call.service';

@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.page.html',
  styleUrls: ['./add-event-modal.page.scss'],
})
export class AddEventModalPage implements OnInit {
  searchTerm: string;
  meals = {};
  
  constructor(
    public modalController: ModalController,
    public router:Router,
    private myAPI: ApiCallService
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }

  searchMeals() {
    console.log("Search Meals", this.searchTerm);

    this.myAPI.makeAPIcall(
			"searchMeals",
			{
        "action": "sendSearchTerm",
        "searchTerm": this.searchTerm
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
					this.meals = data.meals;
					console.log();
				}
			},
			error => console.log(error)
		)
  }

  sendData() {
    console.log(this.searchTerm);
  }

}
