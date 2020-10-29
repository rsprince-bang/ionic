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
	
	userInfo = {
		first: '',
		last: '',
		email: '',
		password: '',
		newpassword: '',
		social_login: ''
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
		console.log("Getting user info...");
		this.myAPI.makeAPIcall(
			"user-info",
			{"action": "loadUserInfo"},
			true
		)
		.subscribe(
			response => {
				// handle error
				if( response.error ){
					this.myAPI.handleMyAPIError(response.error);
				} 
				// set response values to local values
				else {
					let data = response.success;
					this.userInfo.first = data.first_name;
					this.userInfo.last = data.last_name;
					this.userInfo.email = data.email;
					this.userInfo.password = data.password;
				}
			},
			error => console.log(error)
		)
	}

	// Updates user info
	updateUserInfo() {
		console.log("Updating user info...")
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

	get errorControl() {
    return this.userInfoForm.controls;
  }

}
