import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/services/api-call.service';
import { Router } from '@angular/router';
import { Events, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; //in order to use forms I had to import "ReactiveFormsModule" in this page's module
import { GlobalServicesService } from 'src/app/services/global-services.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  credentialsForm: FormGroup;
  userInfo = null;

  constructor(
    private myAPI: ApiCallService, 
    private router: Router, 
    public events: Events,
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    private globalServices: GlobalServicesService) { 

  }

  ngOnInit() {
    //initialize and set form values
    this.credentialsForm = this.formBuilder.group({
      email: ['stoyan.raychev@vpxsports.com', [Validators.required, Validators.email]], 
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
        "date": this.globalServices.getTodayDate()
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

          if( this.userInfo.success.first_time_user && this.userInfo.success.first_time_user == "yes" ){
            this.router.navigateByUrl("/enter-measurements");
          }
          else{
            localStorage.setItem('dailyCaloriesIntake', this.userInfo.success.dailyCaloriesIntake);
            localStorage.setItem('todayMeals', JSON.stringify(this.userInfo.success.todayMeals));

            this.router.navigateByUrl("/home/today");
          }
        }
        else{
          this.presentToastWithOptions("Something went wrong, please try again alter.");
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

}
