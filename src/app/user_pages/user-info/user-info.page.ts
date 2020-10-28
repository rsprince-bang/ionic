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
  }

  dismiss() {
    this.modalController.dismiss();
	}
	
	onSave() {
		console.log(this.userInfoForm.value);
	}

}
