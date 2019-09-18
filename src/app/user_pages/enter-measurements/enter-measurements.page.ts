import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; //in order to use forms I had to import "ReactiveFormsModule" in this page's module
import { PickerController } from '@ionic/angular';
import { ApiCallService } from 'src/app/services/api-call.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-enter-measurements',
  templateUrl: './enter-measurements.page.html',
  styleUrls: ['./enter-measurements.page.scss'],
})
export class EnterMeasurementsPage implements OnInit {

  measurementsForm: FormGroup;
  action = "save";
  currentUserMeasurements = {feet:"", inches:"", weight_lbs:"", age:"", gender:"", activity_level:"" };

  constructor(private formBuilder: FormBuilder, private myAPI: ApiCallService, private route: ActivatedRoute, private router: Router, private navCtrl: NavController) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.action = this.router.getCurrentNavigation().extras.state.action; // has value of update because it is coming from profile page
        this.currentUserMeasurements = this.router.getCurrentNavigation().extras.state.userMeasurements;
        this.currentUserMeasurements.feet = ""+Math.floor(this.router.getCurrentNavigation().extras.state.userMeasurements.height_inches/12);
        this.currentUserMeasurements.inches = ""+this.router.getCurrentNavigation().extras.state.userMeasurements.height_inches%12;
      }
    });
  }

  ngOnInit() {
    this.measurementsForm = this.formBuilder.group({
      heightFeet: [ this.currentUserMeasurements.feet, [ Validators.required, Validators.pattern('[0-9]{1}') ]], 
      heightInches: [this.currentUserMeasurements.inches, [ Validators.required, Validators.pattern('[0-9]+'), Validators.maxLength(2), Validators.max(11) ]],
      weight: [this.currentUserMeasurements.weight_lbs, [ Validators.required, Validators.pattern('[0-9]+') ]],
      age: [this.currentUserMeasurements.age, [ Validators.required, Validators.pattern('[0-9]+') ]],
      gender: [this.currentUserMeasurements.gender, [ Validators.required ]],
      activity: [this.currentUserMeasurements.activity_level, [ Validators.required ]]
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
  

}
