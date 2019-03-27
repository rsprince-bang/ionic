import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; //in order to use forms I had to import "ReactiveFormsModule" in this page's module
import { PickerController } from '@ionic/angular';
import { ApiCallService } from 'src/app/services/api-call.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enter-measurements',
  templateUrl: './enter-measurements.page.html',
  styleUrls: ['./enter-measurements.page.scss'],
})
export class EnterMeasurementsPage implements OnInit {

  measurementsForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private myAPI: ApiCallService, private router: Router) { }

  ngOnInit() {
    this.measurementsForm = this.formBuilder.group({
      heightFeet: ['5', [ Validators.required, Validators.pattern('[0-9]{1}') ]], 
      heightInches: ['11', [ Validators.required, Validators.pattern('[0-9]+'), Validators.maxLength(2), Validators.max(11) ]],
      weight: ['160', [ Validators.required, Validators.pattern('[0-9]+') ]],
      age: ['34', [ Validators.required, Validators.pattern('[0-9]+') ]],
      gender: ['M', [ Validators.required ]],
      activity: ['1.2', [ Validators.required ]]
    });
  }

  submitMeasurements(){
    this.myAPI.makeAPIcall(
      "users.php", 
      {
        "action": "submitMeasurements",
        "form": this.measurementsForm.value
      },
      true
    ).subscribe((result)=>{
      if( result.error ){
        this.myAPI.handleMyAPIError(result.error);
      }
      else{
        localStorage.setItem("dailyCaloriesIntake", result.success.dailyCaloriesIntake);
        this.router.navigateByUrl("/home/today");
      }

    });

  }
}
