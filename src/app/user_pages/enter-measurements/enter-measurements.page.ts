import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiCallService } from 'src/app/services/api-call.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { GlobalServicesService } from 'src/app/services/global-services.service';

@Component({
  selector: 'app-enter-measurements',
  templateUrl: './enter-measurements.page.html',
  styleUrls: ['./enter-measurements.page.scss'],
})
export class EnterMeasurementsPage implements OnInit {
  measurementsForm: FormGroup;
  action = "save";
  height: any;
  currentUserMeasurements = {
    inches:"",  
    weight: "", 
    age:"", 
    gender:"", 
		plan:""
  };
  fileData1: any;
  imageUrl: any = '../../../assets/icon/plaindp.png';
  isImageUploaded: boolean = false;

  ageOptions = [];
  genderOptions = [
		{option: 'Male', value: 'M'},
		{option: 'Female', value: 'F'}
	];
  weightOptions = [];
  planOptions =  [
		{option: '7 week', value: 7},
		{option: '12 week', value: 12}
	];
  heightOptions = [];
  isSubmitted = false;

  constructor(
		private formBuilder: FormBuilder, 
		private myAPI: ApiCallService, 
		private route: ActivatedRoute, 
		private router: Router, 
		private navCtrl: NavController,
		private globalServices: GlobalServicesService
	) { }

  ngOnInit() {
    this.measurementsForm = this.formBuilder.group({
      age: [this.currentUserMeasurements.age, [ Validators.required ]],
      gender: [this.currentUserMeasurements.gender, [ Validators.required ]],
      height: [ this.currentUserMeasurements.inches, [ Validators.required ]],
      weight: [this.currentUserMeasurements.weight, [ Validators.required ]],
			plan: [this.currentUserMeasurements.plan, [ Validators.required ]]
    });

    this.generateAges(18, 100);
    this.generateWeights(90, 300);
    this.generateHeights(4, 6);
  }

  submitMeasurements(){
    console.log(this.measurementsForm.value);
    this.isSubmitted = true;
    if(this.measurementsForm.valid) {
      this.myAPI.makeAPIcall(
        "user", 
        {
          "action": "submitMeasurements",
          "form": this.measurementsForm.value,
          "today": this.globalServices.getDate("today")
        },
        true
      ).subscribe( (result) => {
        if( result.error ){
          this.myAPI.handleMyAPIError(result.error);
        }
        else {
          localStorage.setItem("measurements", JSON.stringify(result.success.measurements));
          localStorage.setItem("diet", JSON.stringify(result.success.diet));
          localStorage.setItem("dailyCaloriesIntake", result.success.measurements.dailyCaloriesIntake);
          localStorage.setItem("currentCaloriesIntake", result.success.diet.cur_calories_intake);
          localStorage.setItem("diet_plan_length", this.measurementsForm.value.plan);
          //after we have or update the diet plan sync alerts
          this.globalServices.syncAlerts();
          localStorage.setItem('diet_start_date', JSON.stringify(result.success.diet.diet_start_date));
          localStorage.setItem("lastFeedback", result.success.diet.feedback_for_week);
  
          if( this.action == "update" ){
            this.router.navigateByUrl("/profile");
          }
          else{
            this.router.navigateByUrl("/tabs/home");
          }
        }
      });
    }
  }
	
  uploadFile(files: FileList) {
    this.isImageUploaded = true;
    let reader = new FileReader(); // HTML5 FileReader API
    let file = files[0];
    this.fileData1 = file
    if (files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
      }
    }
  }

  // generates age options
  generateAges(start, end) {
    for(let i = start; i <= end; i++){
      this.ageOptions.push(i);
		}
		return true;
  }

  // generates height options
  generateHeights(start, end) {
    for(let feet = start; feet <= end; feet++){
      for(let inches = 0; inches <= 11; inches++) {
        let height = feet + "' " + inches + '"';
        let value = (feet * 12) + inches;
        this.heightOptions.push({option: height, valueInches: value});
      }
		}
		return true;
  }

  // generate weight options
  generateWeights(start, end) {
    for(let i = start; i <= end; i++){
      this.weightOptions.push(i);
		}
		return true;
  }

  // used for validation
  get errorControl() {
    return this.measurementsForm.controls;
  }

}