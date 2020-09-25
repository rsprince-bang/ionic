import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; //in order to use forms I had to import "ReactiveFormsModule" in this page's module
import { ApiCallService } from 'src/app/services/api-call.service';
import { GlobalServicesService } from 'src/app/services/global-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder, private myAPI: ApiCallService, private globalServices: GlobalServicesService) { }

  ngOnInit() {
    //initialize and set form values
    this.registerForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last_name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]],
      password_verify: ['', [Validators.required, Validators.minLength(1)]]
    });
  }


  register() {
    if (this.registerForm.value.password == this.registerForm.value.password_verify) {
      this.myAPI.makeAPIcall(
        "login",
        {
          "action": "register",
          "form": this.registerForm.value,
          "today": this.globalServices.getDate("today")
        }
      ).subscribe(
        (result) => {
          if (result.error) {
            this.myAPI.presentToastWithOptions(result.error);
          }
          else if (result.success) {
            localStorage.setItem("token", result.success.token);
            localStorage.setItem("user_id", result.success.user_id);
  
            if( result.success.user.goals.length == 0 ){
              //user never filled out goals
              //this.router.navigateByUrl("/set-goals");
              this.router.navigateByUrl("/welcome");
            }
            else if( result.success.user.measurements.length == 0 ){
              //user never filled out measurements
              this.router.navigateByUrl("/enter-measurements");
            }
            else{
              //localStorage.setItem('diet_start_date', JSON.stringify(result.success.diet_start_date));
              //localStorage.setItem('dailyCaloriesIntake', this.userInfo.success.dailyCaloriesIntake);
              //localStorage.setItem("currentCaloriesIntake", result.success.currentCaloriesIntake);
              //localStorage.setItem("lastFeedback", result.success.lastFeedback);
              //localStorage.setItem('diet_plan_length', result.success.plan_length);
              this.router.navigateByUrl("tabs/home");
            }
          }
          else {
            this.myAPI.presentToastWithOptions("Something went wrong, please try again later.");
          }
        }
      );
    }
    else {
      this.myAPI.presentToastWithOptions("Password does not match.");
    }

  }
  

}
