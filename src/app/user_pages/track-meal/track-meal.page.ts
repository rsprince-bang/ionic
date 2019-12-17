import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalServicesService } from 'src/app/services/global-services.service';
import { FoodSuggestionsService } from 'src/app/services/food-suggestions.service';
import { ApiCallService } from 'src/app/services/api-call.service';
import { HomeAddFoodModalPage } from '../home-add-food-modal/home-add-food-modal.page';

@Component({
  selector: 'app-track-meal',
  templateUrl: './track-meal.page.html',
  styleUrls: ['./track-meal.page.scss'],
})
export class TrackMealPage implements OnInit {

  day = "";
  today = false;
  dayNumber = null;
  date = null;
  meals = [];
  exercises = [];
  status = "";
  percent:number = 0;
  circlesubtitle = "";
  circlecolor = "#c0c0c0"; //gray atr first
  dayNutritionInfo = {"phase":null, "phaseday":null, "daynutrition":{"protein":null, "carbs":null, "fat":null}};
  dietCaloriesIntake = null;
  caloriesConsumed:number = 0;
  caloriesFromProteinAsP:number =0;
  caloriesFromCarbsAsP:number =0;
  caloriesFromFatAsP:number =0;

  constructor( private globalServices: GlobalServicesService, private activatedRoute: ActivatedRoute,
    private foodSuggestionsService: FoodSuggestionsService, private myAPI: ApiCallService, private modalController: ModalController ) { }

  ngOnInit() {
    this.date = this.activatedRoute.snapshot.paramMap.get('day');
    if( this.date == '' ){
      this.date += this.globalServices.getTodayDate();
    }
    this.dayNumber = this.foodSuggestionsService.getDietDayNumber(this.date);
    if( this.date == this.globalServices.getTodayDate() ){
      if(this.today = true){
        this.day = "TODAY"
      }
    }
    this.loadMeals();
  }

  doRefresh(event) {
    this.ngOnInit();
    event.target.complete();
  }

  handleSwipeLeft() {
    if(this.today){
      //won't swipe left tomorrow
    }else{
      this.globalServices.swipeLeft("/track-meal/" + this.globalServices.getNextDate(this.date));
      console.log(this.globalServices.getNextDate(this.date))
    }

  }

  handleSwipeRight() {
    if( this.dayNumber > 1){
      this.globalServices.swipeRight("/track-meal/" + this.globalServices.getPreviousDate(this.date));
      console.log(this.dayNumber)
    }
  }

  loadMeals(){
    this.dayNutritionInfo = this.foodSuggestionsService.getDietDayDescription(this.date);
    this.myAPI.makeAPIcall(
      "meals.php", 
      {
        "action": "getDayInfo",
        "date":this.date
      },
      true
    ).subscribe((result)=>{
      if( result.error ){
        this.myAPI.handleMyAPIError(result.error);
      }
      else{
        this.meals = result.success.dayInfo.meals;
        this.exercises = result.success.dayInfo.exercises;
        this.calculateCaloriesConsumed();
      }
    });
  }

  async openFoodModal(){
    const modal = await this.modalController.create({
      component: HomeAddFoodModalPage,
      componentProps: { date: this.date }
    });

    modal.onDidDismiss()
      .then((response) => {
        if( response.data ){
          this.loadMeals();
        }        
    });

    return await modal.present();
  }

  removeMeal(meal_id) {
    this.meals = this.meals.filter(el => el.id != meal_id);
    this.calculateCaloriesConsumed();

    this.myAPI.makeSilentCall(
      "meals.php",
      {
        "action": "removeMeal",
        "meal_id": meal_id
      },
      true
    );
  }

  calculateCaloriesConsumed(){
    var info = this.foodSuggestionsService.getCaloriesPercentages(this.date, this.meals, this.exercises);

    this.caloriesConsumed = info.caloriesConsumed;
    this.caloriesFromProteinAsP = info.caloriesFromProteinAsP;
    this.caloriesFromCarbsAsP = info.caloriesFromCarbsAsP;
    this.caloriesFromFatAsP = info.caloriesFromFatAsP;
    this.dietCaloriesIntake = info.dietCaloriesIntake;
    this.percent = info.percent;

    if( info.color == "red" ){
      this.circlecolor = "#CA1616";
      this.status = "BAD";
    }
    else if (this.caloriesConsumed == 0){
      this.status = "NO INFO";
    }
    else {
      this.circlecolor = "rgb(56, 129, 255";
      this.status ="GOOD";
    }
    this.circlesubtitle = this.caloriesConsumed+"/"+this.dietCaloriesIntake;
  }


}




