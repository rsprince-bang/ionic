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
      this.date = this.date = this.globalServices.getTodayDate();
    }
    this.dayNumber = this.foodSuggestionsService.getDietDayNumber(this.date);

    if( this.date == this.globalServices.getTodayDate() ){
      this.today = true;
    }
    this.loadMeals();
  }

  doRefresh(event) {
    this.ngOnInit();
    event.target.complete();
  }

  handleSwipeLeft() {
    this.globalServices.swipeLeft("/track-meal/" + this.globalServices.getNextDate(this.date));
  }

  handleSwipeRight() {
    if( this.dayNumber > 1 ){
      this.globalServices.swipeRight("/track-meal/" + this.globalServices.getPreviousDate(this.date));
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
        console.log(this.meals)
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
    else{
      this.circlecolor = "#2FB202"; //green
      this.status ="GOOD";
    }
    this.circlesubtitle = this.caloriesConsumed+"/"+this.dietCaloriesIntake;
  }

}
