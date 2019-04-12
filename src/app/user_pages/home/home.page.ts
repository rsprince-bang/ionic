import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalServicesService } from 'src/app/services/global-services.service';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { HomeAddFoodModalPage } from '../home-add-food-modal/home-add-food-modal.page';
import { ApiCallService } from 'src/app/services/api-call.service';
import { FoodSuggestionsService } from 'src/app/services/food-suggestions.service';
import { HomeAddWorkoutModalPage } from '../home-add-workout-modal/home-add-workout-modal.page';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  day = null;
  date = null;
  dayNumber = null;
  segment_choice = 'nutrition';
  dailyCaloriesIntake = null;
  dietCaloriesIntake = null;
  caloriesConsumed:number = 0;
  caloriesFromProtein:number =0;
  caloriesFromCarbs:number =0;
  caloriesFromFat:number =0;
  meals = [];
  exercises = [];
  percent:number = 0;
  circlesubtitle = "";
  circlecolor = "#c0c0c0"; //gray atr first
  dayNutritionInfo = {"phase":null, "phaseday":null, "daynutrition":{"protein":null, "carbs":null, "fat":null}}

  constructor(private router: Router, private globalServices: GlobalServicesService, private activatedRoute: ActivatedRoute,
    private modalController: ModalController, public actionSheetController: ActionSheetController, private myAPI: ApiCallService,
    private foodSuggestionsService: FoodSuggestionsService) { 

  }

  ngOnInit() {
    this.day = this.activatedRoute.snapshot.paramMap.get('day');
    this.date = this.globalServices.getDate(this.day);

    if( !this.globalServices.hasDailyCaloriesIntake() ){
      this.router.navigateByUrl("/enter-measurements");
    }
 
  }

  ionViewWillEnter(){
    this.updatepage();
  }

  handleSwipeLeft() {
    switch(this.day) { 
      case "yesterday": { 
        this.globalServices.swipeLeft("/home/today");
        break; 
      } 
      case "today": { 
        this.globalServices.swipeLeft("/home/tomorrow");
        break; 
      } 
      default: { 
        //cant swipe past tomorrow 
        break;              
      } 
   }
  }

  handleSwipeRight() {
    switch(this.day) { 
      case "today": { 
        if( this.dayNumber > 1 ){
          //if its not your first day, then you can see previous day
          this.globalServices.swipeRight("/home/yesterday");
        }
        break; 
      } 
      case "tomorrow": { 
        this.globalServices.swipeRight("/home/today");
        break; 
      } 
      default: { 
        //cant swipe before yesterday 
        break;              
      } 
   }
  }

  doRefresh(event) {
    this.updatepage();
    event.target.complete();
  }

  updatepage(){
    this.dayNumber = this.foodSuggestionsService.getDietDayNumber(this.date);
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

  calculateCaloriesConsumed(){
    var info = this.foodSuggestionsService.getCaloriesPercentages(this.date, this.meals, this.exercises);

    this.caloriesConsumed = info.caloriesConsumed;
    this.caloriesFromProtein = info.caloriesFromProtein;
    this.caloriesFromCarbs = info.caloriesFromCarbs;
    this.caloriesFromFat = info.caloriesFromFat;
    this.dietCaloriesIntake = info.dietCaloriesIntake;
    this.percent = info.percent;

    if( info.color == "red" ){
      this.circlecolor = "#CA1616";
    }
    else{
      this.circlecolor = "#2FB202"; //green
    }
    this.circlesubtitle = this.caloriesConsumed+"/"+this.dietCaloriesIntake;
  }

  async openFoodModal(){
    const modal = await this.modalController.create({
      component: HomeAddFoodModalPage,
      componentProps: { day: this.day }
    });

    modal.onDidDismiss()
      .then((response) => {
        if( response.data ){
          this.updatepage();
        }        
    });

    return await modal.present();
  }

  async foodDeleteActionSheet(meal_id, mealName) {
    if(this.day == "today"){
      const actionSheet = await this.actionSheetController.create({
        header: mealName,
        buttons: [{
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.removeMeal(meal_id);
          }
        }, 
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
          }
        }]
      });
      await actionSheet.present();
    }
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

  async openExerciseModal(){
    const modal2 = await this.modalController.create({
      component: HomeAddWorkoutModalPage,
      componentProps: { day: this.day }
    });

    modal2.onDidDismiss()
      .then((response) => {
        if( response.data ){
          this.updatepage();
        }        
    });

    return await modal2.present();
  }

  async exerciseDeleteActionSheet(exercise_id, exerciseName) {
    if(this.day == "today"){
      const actionSheet = await this.actionSheetController.create({
        header: exerciseName,
        buttons: [{
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.removeExercise(exercise_id);
          }
        }, 
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
          }
        }]
      });
      await actionSheet.present();
    }
  }

  removeExercise(exercise_id) {
    this.exercises = this.exercises.filter(el => el.id != exercise_id);
    this.calculateCaloriesConsumed();

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
