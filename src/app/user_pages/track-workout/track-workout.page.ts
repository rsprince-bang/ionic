import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalServicesService } from 'src/app/services/global-services.service';
import { ModalController } from '@ionic/angular';
import { FoodSuggestionsService } from 'src/app/services/food-suggestions.service';
import { ApiCallService } from 'src/app/services/api-call.service';
import { HomeAddWorkoutModalPage } from '../home-add-workout-modal/home-add-workout-modal.page';

@Component({
  selector: 'app-track-workout',
  templateUrl: './track-workout.page.html',
  styleUrls: ['./track-workout.page.scss'],
})
export class TrackWorkoutPage implements OnInit {
  day = ""
  today = false;
  dayNumber = null;
  date = null;
  meals = [];
  exercises = [];



  constructor(private activatedRoute: ActivatedRoute, private globalServices: GlobalServicesService, private modalController: ModalController,
    private foodSuggestionsService: FoodSuggestionsService, private myAPI: ApiCallService) { }

  ngOnInit() {
    this.date = this.activatedRoute.snapshot.paramMap.get('day');
    if( this.date == '' ){
      this.date = this.date = this.globalServices.getTodayDate();
    }
    this.dayNumber = this.foodSuggestionsService.getDietDayNumber(this.date);

    if( this.date == this.globalServices.getTodayDate() ){
      this.today = true;
      this.day = "Today"
    }

    this.loadExercises();
  }

  doRefresh(event) {
    this.ngOnInit();
    event.target.complete();
  }

  handleSwipeLeft() {
    if (this.today){
       // won't swipeLeft 
    }else
    this.globalServices.swipeLeft("/track-workout/" + this.globalServices.getNextDate(this.date));
  }


  handleSwipeRight() {
    if (this.dayNumber > 1) {
      this.globalServices.swipeRight("/track-workout/" + this.globalServices.getPreviousDate(this.date));
    }
  }

  loadExercises(){
    this.myAPI.makeAPIcall(
      "exercises.php", 
      {
        "action": "getExercises",
        "date":this.date
      },
      true
    ).subscribe((result)=>{
      if( result.error ){
        this.myAPI.handleMyAPIError(result.error);
      }
      else{
        this.exercises = result.success.exercises;
      }
    });
  }

  async openExerciseModal(){
    const modal = await this.modalController.create({
      component: HomeAddWorkoutModalPage,
      componentProps: { date: this.date }
    });

    modal.onDidDismiss()
      .then((response) => {
        if( response.data ){
          this.loadExercises();
        }        
    });

    return await modal.present();
  }

  removeExercise(exercise_id) {
    this.exercises = this.exercises.filter(el => el.id != exercise_id);
    this.myAPI.makeSilentCall(
      "exercises.php",
      {
        "action": "removeExercise",
        "exercise_id": exercise_id
      },
      true
    );
  }

}
