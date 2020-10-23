import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; //in order to use forms I had to import "ReactiveFormsModule" in this page's module
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
  isSubmitted = false;
  isChecked = true;

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder, 
    private myAPI: ApiCallService, 
    private globalServices: GlobalServicesService
  ) { }

  ngOnInit() {
    //initialize and set form values
    this.registerForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last_name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      agree: [false, Validators.requiredTrue]
    });
  }

  register() {
    //console.log(this.registerForm.value);
    this.isSubmitted = true;
    if (this.registerForm.valid) {
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
  
            if( !result.success.user.goals || result.success.user.goals.length == 0 ){
              //user never filled out goals
              //this.router.navigateByUrl("/set-goals");
              this.router.navigateByUrl("/welcome");
            }
            else if( !result.success.user.measurements || result.success.user.measurements.length == 0 ){
              //user never filled out measurements
              this.router.navigateByUrl("/enter-measurements");
            }
            else{
              this.router.navigateByUrl("/tabs/home/today");
            }
          }
          else {
            this.myAPI.presentToastWithOptions("Something went wrong, please try again later.");
          }
        }
      );
    }
  }

  get errorControl() {
    return this.registerForm.controls;
  }

}
