import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalController, AlertController, PopoverController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalServicesService } from 'src/app/services/global-services.service';
import { FoodSuggestionsService } from 'src/app/services/food-suggestions.service';
import { ApiCallService } from 'src/app/services/api-call.service';
import { HomeAddFoodModalPage } from '../home-add-food-modal/home-add-food-modal.page';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import * as pluginLabels from 'chartjs-plugin-labels';
import { AddEventModalPage } from '../add-event-modal/add-event-modal.page';
import {NotificationModal} from '../modals/notification-modal/notification-modal';

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
  circleSubtitle = "";
  circleColor = '#c0c0c0'; //gray atr first
  dayNutritionInfo = {'phase':null, phaseday:null, daynutrition:{protein:null, carbs:null, fat:null}};
  dietCaloriesIntake = null;
  caloriesConsumed:number = 0;
  caloriesFromProteinAsP:number =0;
  caloriesFromCarbsAsP:number =0;
  caloriesFromFatAsP:number =0;
  planLength_weeks;
  suggestedSupplements;
  dayNumberVal = 18
  dayCount = 18
  dateVal = 4
  dateCount = 4
  // PIE CHART VARIABLES
  pieChartOptions: ChartOptions;
  pieChartLabels: Label[];
  pieChartData: SingleDataSet;
  pieChartType: ChartType;
  pieChartLegend: boolean;
  pieChartPlugins = [];
  pieChartColors = [
    {
      backgroundColor: ['#00B8FF', '#FF00CB', '#2CA500'],
    },
  ];

  constructor( 
    private globalServices: GlobalServicesService, 
    private activatedRoute: ActivatedRoute,
    public router: Router, 
    public alertController: AlertController, 
    private foodSuggestionsService: FoodSuggestionsService, 
    private myAPI: ApiCallService,
    private modalController: ModalController, 
    public popoverController: PopoverController
  ) { }

  // TO DO: new variables, functions
  todaysNutrition = {
    calories: {intake: 1100, recommended: 2200},
    fats: {intake: 42, recommended: 101},
    protein: {intake: 62, recommended: 401},
    carbs: {intake: 101, recommended: 201},
    numMeals: 3,
    meals: [
      {desc: "10 Ounces of Ribeye", calories: 800, fat: 20, protein: 20, carbs: 10, selected: false},
      {desc: "3 Ounces of Broccoli", calories: 60, fat: 0, protein: 0, carbs: 10, selected: false},
      {desc: "1 Ounce of Cheese", calories: 100, fat: 5, protein: 2, carbs: 0, selected: false}
    ],
    suggestions: [
      {name: 'Bang Keto Coffee- BCB', cal: '120 cal.', fat: 0, protein: 0, carbs: 0, selected: false},
      {name: 'Pristine Protein WPI ', cal: '90 cal.', fat: 8, protein: 16, carbs: 10, selected: false},
      {name: '8 KETO ZERO CARB', cal: '50 cal.', fat: 2, protein: 8, carbs: 10, selected: false}
    ],
    ratio: {fat: 10, protein: 50, carbs: 40}
  }

  testNutrition: any;

  progressBar: number = this.todaysNutrition.calories.intake / this.todaysNutrition.calories.recommended;
  caloriesRemaining = this.todaysNutrition.calories.recommended - this.todaysNutrition.calories.intake;

  // gets todaysNutrition
	getTodaysNutrition() {
		this.myAPI.makeAPIcall(
			"meals",
			{
				"action": "getDayInfo",
				"date": this.date
			},
			true
		)
		.subscribe(
			response => {
				// handle error
				if( response.error ){
					this.myAPI.handleMyAPIError(response.error);
				} 
				// successful response
				else {
					let data = response.success;
					this.testNutrition = data.dayInfo.meals;
					console.log("Today: ", this.testNutrition);
				}
			},
			error => console.log(error)
		)
	}

    // call API to get calories
    // set variables
    // calculate progress bar
    // display breakdown of fats, proteins, carbs
    // display numOfMeals
    // calculate and display calories remaining
    // get days in Plan (plan.day, plan.totaldays)
    // list meals already consumed:
    // - meal.desc, meal.calories, meal.fat, meal.protein, meal.carbs
    // get data for calorie ratio, ratio.fat, ratio.protein, ratio.carbs
    // get supplement suggestions:
    //   - suggest.desc, suggest.calories, .fat, .protein, .carbs


  ngOnInit() {
    console.log("Date: ", this.date);
    this.getTodaysNutrition();

    // CALORIE RATIO CHART SETTINGS
    this.pieChartOptions = this.createOptions();
    this.pieChartLabels = ['Protein', 'Carbs', 'Fat'];
    this.pieChartData = [this.todaysNutrition.ratio.protein, this.todaysNutrition.ratio.carbs, this.todaysNutrition.ratio.fat];
    this.pieChartType = 'doughnut';
    this.pieChartLegend = true;
    this.pieChartPlugins = [pluginLabels];
    this.day = this.activatedRoute.snapshot.paramMap.get('day');
    this.date = this.globalServices.getDate(this.day);
    this.date = this.activatedRoute.snapshot.paramMap.get('day');
    if( this.date == '' ){
      this.date = this.date = this.globalServices.getTodayDate();
    }
    this.dayNumber = this.foodSuggestionsService.getDietDayNumber(this.date);
    if( this.date === this.globalServices.getTodayDate() ){
      if(this.today = true){
        // this.day = "TODAY"
      }
    }
    this.planLength_weeks = this.foodSuggestionsService.getDietPlanWeeks();
    this.suggestedSupplements = this.foodSuggestionsService.getSupplementSuggestions(this.date, this.planLength_weeks);
    this.loadMeals();
  }

  // PIE CHART OPTIONS
  private createOptions(): ChartOptions {
    return {
      responsive: true,
          maintainAspectRatio: true,
          plugins: {
              labels: {
                render: 'percentage',
                fontColor: ['white', 'white', 'white'],
                precision: 0
              }
          },
          legend: {
            labels: {
              usePointStyle: true
            }
          }
    };
  }

  doRefresh(event) {
    this.ngOnInit();
    event.target.complete();
  }

  handleSwipeLeft() {
    this.dayNumberVal = this.dayNumberVal + 1
      this.dateVal = this.dateVal + 1; 
    if(this.today){
      //won't swipe left tomorrow
    }else{  
      this.globalServices.swipeLeft("/track-meal/" );
    }
  }

  handleSwipeRight() {
    this.dayNumberVal = this.dayNumberVal - 1
    this.dateVal = this.dateVal - 1
    if( this.dayNumber > 1 ){
      this.globalServices.swipeRight("/track-meal/");
    }
  }

  loadMeals(){
    console.log("Loading meals...");
    // this.dayNutritionInfo = this.foodSuggestionsService.getDietDayDescription(this.date, this.planLength_weeks);
    this.myAPI.makeAPIcall(
      "meals", 
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
        console.log("Load Meals: ", result.success);
        this.meals = result.success.dayInfo.meals;
        this.exercises = result.success.dayInfo.exercises;
        this.calculateCaloriesConsumed();
      }
    });
  }

  async openFoodModal(){
    this.router.navigateByUrl('/home-add')
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
    var info = this.foodSuggestionsService.getCaloriesPercentages(this.date, this.meals, this.exercises, this.planLength_weeks);

    this.caloriesConsumed = info.caloriesConsumed;
    this.caloriesFromProteinAsP = info.caloriesFromProteinAsP;
    this.caloriesFromCarbsAsP = info.caloriesFromCarbsAsP;
    this.caloriesFromFatAsP = info.caloriesFromFatAsP;
    this.dietCaloriesIntake = info.dietCaloriesIntake;
    this.percent = info.percent;

    if( info.color == "red" ){
      this.circleColor = "#CA1616";
      this.status = "BAD";
    }
    else if (this.caloriesConsumed == 0){
      this.status = "NO INFO";
    }
    else {
      this.circleColor = "rgb(56, 129, 255";
      this.status ="GOOD";
    }
    this.circleSubtitle = this.caloriesConsumed+"/"+this.dietCaloriesIntake;
  }
  // function to expand today's meals list item 
  expandRow(data) {
    data.selected = !data.selected;
  }
  // function to open add meal modal
  async openModal() {
    const modal = await this.modalController.create({component: AddEventModalPage});
    return await modal.present();
  }

  // Alert to delete today's meals list
  async deleteItem(index) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'You are deleting this meal. Keep in mind that, by doing so, your nutritional goals and progress for the day will be recalibrated.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          cssClass: 'endDiet',
          handler: () => {
            this.todaysNutrition.meals.splice(index,1)
          }
        }
      ]
    });

    await alert.present();
  }
  
  showSettings() {
    this.router.navigateByUrl('/settings');
  }

  async handleButtonClick(ev) {
    const popover = await this.popoverController.create({
       component: NotificationModal,
       event: ev,
       translucent: true,
     });
     await popover.present();
     const { data } = await popover.onWillDismiss();
  }
}
