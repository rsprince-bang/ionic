import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; //in order to use forms I had to import "ReactiveFormsModule" in this page's module
import { PickerController } from '@ionic/angular';
import { ApiCallService } from 'src/app/services/api-call.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FoodSuggestionsService } from 'src/app/services/food-suggestions.service';

@Component({
  selector: 'app-enter-measurements',
  templateUrl: './enter-measurements.page.html',
  styleUrls: ['./enter-measurements.page.scss'],
})
export class EnterMeasurementsPage implements OnInit {

  measurementsForm: FormGroup;
  action = "save";
  heightFeetOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  heightInchesOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  currentUserMeasurements = {
    feet:"", 
    inches:"", 
    month: '', 
    date: '', 
    year: '',
    weight_lbs:"", target_weight_lbs:"", age:"", gender:"", activity_level:"", plan_length:"" };
    fileData1
    imageUrl:any='../../../assets/icon/plaindp.png';
    isImageUploaded = false;
  constructor(private formBuilder: FormBuilder, private myAPI: ApiCallService, private route: ActivatedRoute, private router: Router, private navCtrl: NavController,
     private foodSuggestionsService: FoodSuggestionsService) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.action = this.router.getCurrentNavigation().extras.state.action; // has value of "update" because it is coming from profile page
                                                                              //or has value of "confirm" if coming from reset diet redirect
        this.currentUserMeasurements = this.router.getCurrentNavigation().extras.state.userMeasurements;
        this.currentUserMeasurements.feet = ""+Math.floor(this.router.getCurrentNavigation().extras.state.userMeasurements.height_inches/12);
        this.currentUserMeasurements.inches = ""+this.router.getCurrentNavigation().extras.state.userMeasurements.height_inches%12;
        this.currentUserMeasurements.plan_length = this.foodSuggestionsService.getDietPlanWeeks().toString();
      }
    });
    
  }

  ngOnInit() {
    this.measurementsForm = this.formBuilder.group({
      heightFeet: [ this.currentUserMeasurements.feet, [ Validators.required, Validators.pattern('[0-9]{1}') ]], 
      heightInches: [this.currentUserMeasurements.inches, [ Validators.required, Validators.pattern('[0-9]+'), Validators.maxLength(2), Validators.max(11) ]],
      month: [this.currentUserMeasurements.month, [ Validators.required, Validators.pattern('[0-9]+'), Validators.maxLength(2), Validators.max(12) ]],
      date: [this.currentUserMeasurements.date, [ Validators.required, Validators.pattern('[0-9]+'), Validators.maxLength(2), Validators.max(31) ]],
      year: [this.currentUserMeasurements.year, [ Validators.required, Validators.pattern('[0-9]+'), Validators.maxLength(4) ]],
      
      weight: [this.currentUserMeasurements.weight_lbs, [ Validators.required, Validators.pattern('[0-9]+') ]],
      target_weight: [this.currentUserMeasurements.target_weight_lbs, [ Validators.required, Validators.pattern('[0-9]+') ]],
      age: [this.currentUserMeasurements.age, [ Validators.required, Validators.pattern('[0-9]+') ]],
      gender: [this.currentUserMeasurements.gender, [ Validators.required ]],
      activity: [this.currentUserMeasurements.activity_level, [ Validators.required ]],
      plan: [this.currentUserMeasurements.plan_length, [ Validators.required, Validators.pattern('[0-9]+') ]]
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
        localStorage.setItem("currentCaloriesIntake", result.success.currentCaloriesIntake);
        localStorage.setItem("diet_plan_length", this.measurementsForm.value.plan);
        
        if( this.action == "update" ){
          this.router.navigateByUrl("/profile");
        }
        else{
          this.router.navigateByUrl("/home/today");
        }
      }
    });
  }

  goBack(){
    this.navCtrl.navigateBack('/profile');
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
  goBackToHome() {
    this.router.navigateByUrl("/home/today");
  }
  onClickDiet() {
    this.router.navigateByUrl("/set-goals");
  }
}