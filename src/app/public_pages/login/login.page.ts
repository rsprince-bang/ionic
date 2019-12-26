import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/services/api-call.service';
import { Router } from '@angular/router';
import { Events, ToastController, LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; //in order to use forms I had to import "ReactiveFormsModule" in this page's module
import { GlobalServicesService } from 'src/app/services/global-services.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  credentialsForm: FormGroup;
  userInfo = null;

  constructor(
    private myAPI: ApiCallService, private router: Router, public events: Events, private formBuilder: FormBuilder, public toastController: ToastController,
    private globalServices: GlobalServicesService, private facebook: Facebook, public loadingController: LoadingController) { 

  }

  ngOnInit() {
    //initialize and set form values
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(1)]]
    });
  }


  login() {
    this.myAPI.makeAPIcall(
      "login.php", 
      {
        "action": "login",
        "email": this.credentialsForm.value.email,
        "password": this.credentialsForm.value.password,
        //in case its a returning user lets load the meals as well
        "yesterday": this.globalServices.getDate("yesterday"),
        "today": this.globalServices.getDate("today"),
        "tomorrow": this.globalServices.getDate("tomorrow")
      }
    )
    .subscribe(
      (result) => {
        this.userInfo = result;

        if( this.userInfo.error ){
          this.presentToastWithOptions(this.userInfo.error);
        }
        else if(this.userInfo.success){
          localStorage.setItem("token", this.userInfo.success.token);
          localStorage.setItem("user_id", this.userInfo.success.user_id);
          this.events.publish("user logged in", 1111, 2222); //test passsing args
          localStorage.setItem('diet_start_date', JSON.stringify(result.success.diet_start_date));

          if( this.userInfo.success.first_time_user && this.userInfo.success.first_time_user == "yes" ){
            this.router.navigateByUrl("/enter-measurements");
          }
          else{
            localStorage.setItem('dailyCaloriesIntake', this.userInfo.success.dailyCaloriesIntake);
            localStorage.setItem("currentCaloriesIntake", result.success.currentCaloriesIntake);
            localStorage.setItem('diet_plan_length', result.success.plan_length);
            this.router.navigateByUrl("/home/today");
          }
        }
        else{
          this.presentToastWithOptions("Something went wrong, please try again later.");
        }
      }
    );
  }


  async presentToastWithOptions(message) {
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'OK',
      duration: 3000,
      translucent: false
    });
    toast.present();
  }

	async doFbLogIn(){
    this.myAPI.presentLoading();
    this.facebook.login(["public_profile", "email"])
    .then( (response:FacebookLoginResponse) =>{
			let userId = response.authResponse.userID;
			//Getting name and gender properties
			this.facebook.api("/me?fields=name,email,id,first_name,last_name", [])
			.then(user =>{
        this.myAPI.dismissLoading();
        this.loginWithFB(user);
			},error=>{
        this.myAPI.dismissLoading();
        this.presentToastWithOptions("Something went wrong, please try again later.");
      })
		}, error =>{
      //alert("error");
      //alert(JSON.stringify(error));
      this.myAPI.dismissLoading();
      this.presentToastWithOptions("Something went wrong, please try again later.");
		});
  }
  

  loginWithFB(fbuser) {
    this.myAPI.makeAPIcall(
      "login.php", 
      {
        "action": "loginWfb",
        "fbuser": fbuser,
        //in case its a returning user lets load the meals as well
        "yesterday": this.globalServices.getDate("yesterday"),
        "today": this.globalServices.getDate("today"),
        "tomorrow": this.globalServices.getDate("tomorrow")
      }
    )
    .subscribe(
      (result) => {
        this.userInfo = result;

        if( this.userInfo.error ){
          this.presentToastWithOptions(this.userInfo.error);
        }
        else if(this.userInfo.success){
          localStorage.setItem("token", this.userInfo.success.token);
          localStorage.setItem("user_id", this.userInfo.success.user_id);
          this.events.publish("user logged in", 1111, 2222); //test passsing args
          localStorage.setItem('diet_start_date', JSON.stringify(result.success.diet_start_date));

          if( this.userInfo.success.first_time_user && this.userInfo.success.first_time_user == "yes" ){
            this.router.navigateByUrl("/enter-measurements");
          }
          else{
            localStorage.setItem('dailyCaloriesIntake', this.userInfo.success.dailyCaloriesIntake);
            localStorage.setItem("currentCaloriesIntake", result.success.currentCaloriesIntake);
            localStorage.setItem('diet_plan_length', result.success.plan_length );
            this.router.navigateByUrl("/home/today");
          }
        }
        else{
          this.presentToastWithOptions("Something went wrong, please try again later.");
        }
      }
    );
  }


  doFbLogout(){
    //do we really need this function? Not sure. it might log us out of facebook as well.....

/* 		this.fb.logout()
		.then(res =>{
			//user logged out so we will remove him from the NativeStorage
			this.nativeStorage.remove('facebook_user');
			this.router.navigate(["/login"]);
		}, error =>{
			console.log(error);
		}); */
	}

}
