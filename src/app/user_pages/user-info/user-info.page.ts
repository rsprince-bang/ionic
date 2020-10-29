import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ApiCallService } from 'src/app/services/api-call.service';
import { GlobalServicesService } from 'src/app/services/global-services.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {
	userInfoForm: FormGroup;
  isSubmitted = false;
	isChecked = true;
	
	userInfo = {
		first: 'Jack',
		last: 'Owoc',
		email: 'jack@bangenergy.com',
		password: '12345678',
		newpassword: ''
	}

  constructor(
		private modalController: ModalController,
		private formBuilder: FormBuilder, 
    private myAPI: ApiCallService, 
    private globalServices: GlobalServicesService	
	) { }

  ngOnInit() {
    //initialize and set form values
    this.userInfoForm = this.formBuilder.group({
      first_name: [this.userInfo.first, [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last_name: [this.userInfo.last, [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      email: [this.userInfo.email, [Validators.required, Validators.email]],
			password: [this.userInfo.password, [Validators.required, Validators.minLength(8)]],
			newpassword: [this.userInfo.newpassword, [Validators.required, Validators.minLength(8)]],
		});
		// get current user info
		this.getCurrentUserInfo();
  }

	// Dismisses modal
  dismiss() {
    this.modalController.dismiss();
	}
	
	// Saves edits to user info
	onSave() {
		console.log(this.userInfoForm.value);
	}

	// gets current user info from the endpoint
	getCurrentUserInfo() {
		console.log("Gettin user info...")
		this.myAPI.makeAPIcall(
			"user-info",
			{"action": "loadUserInfo"},
			true
		)
		.subscribe(
			response => {
				if( response.error ){
					this.myAPI.handleMyAPIError(response.error);
				} else {
					// set response values to local values
					this.userInfo.first = response.first_name;
					this.userInfo.last = response.last_name;
					this.userInfo.email = response.email;
					this.userInfo.password = response.password;
				}
			},
			error => console.log(error)
		)
	}

	// Updates user info
	updatetUserInfo() {
		console.log("Gettin user info...")
		this.myAPI.makeAPIcall(
			"user-info",
			{"action": "saveUserInfo"},
			true
		)
		.subscribe(
			response => {
				if( response.error ){
					this.myAPI.handleMyAPIError(response.error);
				}
			},
			error => console.log(error)
		)
	}

}
