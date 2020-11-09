import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/services/api-call.service';
import { Router } from '@angular/router';
import { Events, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; //in order to use forms I had to import "ReactiveFormsModule" in this page's module
import { GlobalServicesService } from 'src/app/services/global-services.service';
import "@codetrix-studio/capacitor-google-auth";
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
  device = null;
  

  constructor(
    private myAPI: ApiCallService, 
    private router: Router, 
    public events: Events, 
    private formBuilder: FormBuilder, 
    public toastController: ToastController,
    private globalServices: GlobalServicesService, 
    public loadingController: LoadingController, 
    private http: HttpClient,
    public alertController: AlertController
    ) { 

  }

  ngOnInit() {
    //initialize and set form values
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.globalServices.getDeviceInfo().then(data => {
      this.device = data;
    });
  }

  get errorControl() {
    return this.credentialsForm.controls;
  }

  login() {
    this.isSubmitted = true;
    if (this.credentialsForm.valid) {
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
            // this.presentAlert(this.userInfo.error);
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
              localStorage.setItem("alerts", JSON.stringify(this.userInfo.success.user.alerts));
              localStorage.setItem("measurements", JSON.stringify(this.userInfo.success.user.measurements));
              localStorage.setItem("diet", JSON.stringify(this.userInfo.success.user.diet));
              localStorage.setItem('dailyCaloriesIntake', this.userInfo.success.user.measurements.dailyCaloriesIntake);
              localStorage.setItem("currentCaloriesIntake", this.userInfo.success.user.diet.cur_calories_intake);
              localStorage.setItem("diet_plan_length", this.userInfo.success.user.diet.plan_length);
              localStorage.setItem('diet_start_date', JSON.stringify(this.userInfo.success.user.diet.diet_start_date));
              localStorage.setItem("lastFeedback", this.userInfo.success.user.diet.feedback_for_week);
              this.globalServices.syncAlerts();

              this.router.navigateByUrl("/tabs/home");
            }
          }
          else{
            this.presentToastWithOptions("Something went wrong, please try again later.");
          }
        }
      );
    }
  }

  async presentToastWithOptions(message) {
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: false,
      position: 'bottom',
      closeButtonText: '',
      duration: 3000,
      translucent: false,
      color: "dark"
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
            localStorage.setItem("alerts", JSON.stringify(this.userInfo.success.user.alerts));
            localStorage.setItem("measurements", JSON.stringify(this.userInfo.success.user.measurements));
            localStorage.setItem("diet", JSON.stringify(this.userInfo.success.user.diet));
            localStorage.setItem('dailyCaloriesIntake', this.userInfo.success.user.measurements.dailyCaloriesIntake);
            localStorage.setItem("currentCaloriesIntake", this.userInfo.success.user.diet.cur_calories_intake);
            localStorage.setItem("diet_plan_length", this.userInfo.success.user.diet.plan_length);
            localStorage.setItem('diet_start_date', JSON.stringify(this.userInfo.success.user.diet.diet_start_date));
            localStorage.setItem("lastFeedback", this.userInfo.success.user.diet.feedback_for_week);
            this.globalServices.syncAlerts();

            this.router.navigateByUrl("/tabs/home");
          }
        }
        // else{
        //   this.presentToastWithOptions("Something went wrong, please try again later.");
        // }
      }
    );
  }

  doAppleLogIn(){
    Plugins.SignInWithApple.Authorize()
      .then(async (res) => {
        if (res.response && res.response.identityToken) {
          //when using appleidn for the first time the name and e-mail are in the response
          if( !res.response.email ){
            this.presentAlert('We we not able to get your e-mail. Inside your iOS device, open the Settings app and navigate to Apple ID -> Password & Security -> Apps Using Apple ID. Delete the entry for our diet app and try again.');
          }
          else{
            this.loginWithApple(res.response);
          }
        } 
        else {
          //console.log('not ok');
        }
      })
      .catch((response) => {
        //console.log('catch plugin error');
        //console.log(response);
      });
  }

  loginWithApple(appleid_user) {
    //console.log(appleid_user.givenName);
    //console.log(appleid_user.familyName);
    //console.log(appleid_user.email);
    this.myAPI.makeAPIcall(
      "login", 
      {
        "action": "loginWithApple",
        "appleid_user": appleid_user,
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
            localStorage.setItem("alerts", JSON.stringify(this.userInfo.success.user.alerts));
            localStorage.setItem("measurements", JSON.stringify(this.userInfo.success.user.measurements));
            localStorage.setItem("diet", JSON.stringify(this.userInfo.success.user.diet));
            localStorage.setItem('dailyCaloriesIntake', this.userInfo.success.user.measurements.dailyCaloriesIntake);
            localStorage.setItem("currentCaloriesIntake", this.userInfo.success.user.diet.cur_calories_intake);
            localStorage.setItem("diet_plan_length", this.userInfo.success.user.diet.plan_length);
            localStorage.setItem('diet_start_date', JSON.stringify(this.userInfo.success.user.diet.diet_start_date));
            localStorage.setItem("lastFeedback", this.userInfo.success.user.diet.feedback_for_week);
            this.globalServices.syncAlerts();

            this.router.navigateByUrl("/tabs/home");
          }
        }
        // else{
        //   this.presentToastWithOptions("Something went wrong, please try again later.");
        // }
      }
    );
  }

  async doGoogleLogIn(){
    let googleUser = await Plugins.GoogleAuth.signIn(null) as any;

    if( googleUser && googleUser.hasOwnProperty('email') ){
      if( googleUser.email && googleUser.email != '' ){
        this.loginWithGoogle(googleUser);
      }
    }
  }

  loginWithGoogle(googleUser) {
    // console.log(googleUser.givenName);
    // console.log(googleUser.familyName);
    // console.log(googleUser.email);
    this.myAPI.makeAPIcall(
      "login", 
      {
        "action": "loginWithGoogle",
        "googleUser": googleUser,
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
            localStorage.setItem("alerts", JSON.stringify(this.userInfo.success.user.alerts));
            localStorage.setItem("measurements", JSON.stringify(this.userInfo.success.user.measurements));
            localStorage.setItem("diet", JSON.stringify(this.userInfo.success.user.diet));
            localStorage.setItem('dailyCaloriesIntake', this.userInfo.success.user.measurements.dailyCaloriesIntake);
            localStorage.setItem("currentCaloriesIntake", this.userInfo.success.user.diet.cur_calories_intake);
            localStorage.setItem("diet_plan_length", this.userInfo.success.user.diet.plan_length);
            localStorage.setItem('diet_start_date', JSON.stringify(this.userInfo.success.user.diet.diet_start_date));
            localStorage.setItem("lastFeedback", this.userInfo.success.user.diet.feedback_for_week);
            this.globalServices.syncAlerts();

            this.router.navigateByUrl("/tabs/home");
          }
        }
        // else{
        //   this.presentToastWithOptions("Something went wrong, please try again later.");
        // }
      }
    );
  }

  async presentAlert(alertMsg) {
    const alert = await this.alertController.create({
      cssClass: '',
      header: 'Login Failed',
      subHeader: '',
      message: alertMsg,
      buttons: ['OK']
    });

    await alert.present();
  }


}
