import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/services/api-call.service';
import { Router } from '@angular/router';
import { Events, ToastController, LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; //in order to use forms I had to import "ReactiveFormsModule" in this page's module
import { GlobalServicesService } from 'src/app/services/global-services.service';
import { Plugins } from '@capacitor/core';
import { FacebookLoginResponse } from '@capacitor-community/facebook-login';
const { FacebookLogin } = Plugins;
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  credentialsForm: FormGroup;
  userInfo = null;
  isSubmitted = false;
  

  constructor(
    private myAPI: ApiCallService, private router: Router, public events: Events, private formBuilder: FormBuilder, public toastController: ToastController,
    private globalServices: GlobalServicesService, public loadingController: LoadingController, private http: HttpClient) { 

  }

  ngOnInit() {
    //initialize and set form values
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  get errorControl() {
    return this.credentialsForm.controls;
  }

  login() {
    this.isSubmitted = true;
    this.myAPI.makeAPIcall(
      "login", 
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
          //this.events.publish("user logged in", 1111, 2222); //test passsing args

          if( !this.userInfo.success.user.goals || this.userInfo.success.user.goals.length == 0 ){
            //user never filled out goals
            //this.router.navigateByUrl("/set-goals");
            this.router.navigateByUrl("/welcome");
          }
          else if( !this.userInfo.success.user.measurements || this.userInfo.success.user.measurements.length == 0 ){
            //user never filled out measurements
            this.router.navigateByUrl("/enter-measurements");
          }
          else{
            localStorage.setItem("goals", JSON.stringify(this.userInfo.success.user.goals));
            localStorage.setItem("measurements", JSON.stringify(this.userInfo.success.user.measurements));
            localStorage.setItem("diet", JSON.stringify(this.userInfo.success.user.diet));
            localStorage.setItem('dailyCaloriesIntake', this.userInfo.success.user.measurements.dailyCaloriesIntake);
            localStorage.setItem("currentCaloriesIntake", this.userInfo.success.user.diet.cur_calories_intake);
            localStorage.setItem("diet_plan_length", this.userInfo.success.user.diet.plan_length);
            localStorage.setItem('diet_start_date', JSON.stringify(this.userInfo.success.user.diet.diet_start_date));
            localStorage.setItem("lastFeedback", this.userInfo.success.user.diet.feedback_for_week);

            this.router.navigateByUrl("/tabs/home/today");
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


  async doFbLogIn(): Promise<void> {
    const FACEBOOK_PERMISSIONS = ['public_profile', 'email'];
    const result = await Plugins.FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });
    if (result && result.accessToken) {     
      this.http.get('https://graph.facebook.com/'+result.accessToken.userId
      +'?fields=name,email,id,first_name,last_name&access_token='+result.accessToken.token).subscribe((response) => {
        this.loginWithFB(response);
      },
      (error) => {
        this.presentToastWithOptions("Something went wrong, please try again later.");
      });
    }
    else{
      this.presentToastWithOptions("Something went wrong, please try again later.");
    }
  }
 

  loginWithFB(fbuser) {
    this.myAPI.makeAPIcall(
      "login", 
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
          //this.events.publish("user logged in", 1111, 2222); //test passsing args

          if( !this.userInfo.success.user.goals || this.userInfo.success.user.goals.length == 0 ){
            //user never filled out goals
            //this.router.navigateByUrl("/set-goals");
            this.router.navigateByUrl("/welcome");
          }
          else if( !this.userInfo.success.user.measurements || this.userInfo.success.user.measurements.length == 0 ){
            //user never filled out measurements
            this.router.navigateByUrl("/enter-measurements");
          }
          else{
            localStorage.setItem("goals", JSON.stringify(this.userInfo.success.user.goals));
            localStorage.setItem("measurements", JSON.stringify(this.userInfo.success.user.measurements));
            localStorage.setItem("diet", JSON.stringify(this.userInfo.success.user.diet));
            localStorage.setItem('dailyCaloriesIntake', this.userInfo.success.user.measurements.dailyCaloriesIntake);
            localStorage.setItem("currentCaloriesIntake", this.userInfo.success.user.diet.cur_calories_intake);
            localStorage.setItem("diet_plan_length", this.userInfo.success.user.diet.plan_length);
            localStorage.setItem('diet_start_date', JSON.stringify(this.userInfo.success.user.diet.diet_start_date));
            localStorage.setItem("lastFeedback", this.userInfo.success.user.diet.feedback_for_week);

            this.router.navigateByUrl("/tabs/home/today");
          }
        }
        else{
          this.presentToastWithOptions("Something went wrong, please try again later.");
        }
      }
    );
  }


}
