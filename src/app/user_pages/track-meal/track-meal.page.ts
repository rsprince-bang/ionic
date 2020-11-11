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
  dayNutritionInfo = {daynumber:null, phaseday:null, daynutrition:{protein:null, carbs:null, fat:null}};
  planLength_weeks;

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

  // fake hardcoded data
  todaysNutrition = {
    calories: {intake: 0, recommended: 0},
    fats: {intake: 0, recommended: 0},
    protein: {intake: 0, recommended: 0},
    carbs: {intake: 0, recommended: 0},
    meals: [
      // {meal_name: "10 Ounces of Ribeye", calories: 800, fat: 20, protein: 20, carbs: 10, selected: false},
      // {meal_name: "3 Ounces of Broccoli", calories: 60, fat: 0, protein: 0, carbs: 10, selected: false},
      // {meal_name: "1 Ounce of Cheese", calories: 100, fat: 5, protein: 2, carbs: 0, selected: false}
    ],
    suggestions: [
      // {name: 'Bang Keto Coffee- BCB', cal: '120 cal.', fat: 0, protein: 0, carbs: 0, selected: false},
      // {name: 'Pristine Protein WPI ', cal: '90 cal.', fat: 8, protein: 16, carbs: 10, selected: false},
      // {name: '8 KETO ZERO CARB', cal: '50 cal.', fat: 2, protein: 8, carbs: 10, selected: false}
    ]
    }

  progressBar: number = 0;
  caloriesRemaining = 0;

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

  ngOnInit() {
    this.date = this.date = this.globalServices.getTodayDate();
    this.dayNumber = this.foodSuggestionsService.getDietDayNumber(this.date);
    this.planLength_weeks = this.foodSuggestionsService.getDietPlanWeeks();
    this.dayNutritionInfo = this.foodSuggestionsService.getDietDayDescription(this.date);

    // CALORIE RATIO CHART SETTINGS
    this.pieChartOptions = this.createOptions();
    this.pieChartLabels = ['Protein', 'Carbs', 'Fat'];
    this.pieChartData = [this.dayNutritionInfo.daynutrition.protein, this.dayNutritionInfo.daynutrition.carbs, this.dayNutritionInfo.daynutrition.fat];
    this.pieChartType = 'doughnut';
    this.pieChartLegend = true;
    this.pieChartPlugins = [pluginLabels];
    
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

  loadMeals(){
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
        this.todaysNutrition.meals = result.success.dayInfo.meals;
        this.calculateCaloriesConsumed();
      }
    });
  }

  async openFoodModal(){
    this.router.navigateByUrl('/home-add')
  }

  removeMeal(meal_id) {
    this.todaysNutrition.meals = this.todaysNutrition.meals.filter(el => el.id != meal_id);
    this.calculateCaloriesConsumed();

    this.myAPI.makeSilentCall(
      "meals",
      {
        "action": "removeMeal",
        "meal_id": meal_id
      },
      true
    );
  }

  calculateCaloriesConsumed(){
    var info = this.foodSuggestionsService.getCalorieGrams(this.date, this.todaysNutrition.meals, this.planLength_weeks);

    this.todaysNutrition.calories.intake = info.caloriesConsumed;
    this.todaysNutrition.calories.recommended = info.dietCaloriesIntake;
    this.todaysNutrition.fats.intake = Math.round(info.gramsFatConsumed);
    this.todaysNutrition.fats.recommended = Math.round(info.targetFat);
    this.todaysNutrition.protein.intake = Math.round(info.gramsProteinConsumed);
    this.todaysNutrition.protein.recommended = Math.round(info.targetProtein);
    this.todaysNutrition.carbs.intake = Math.round(info.gramsCarbsConsumed);
    this.todaysNutrition.carbs.recommended = Math.round(info.targetCarbs);

    this.caloriesRemaining = this.todaysNutrition.calories.recommended - this.todaysNutrition.calories.intake;
    if( this.caloriesRemaining < 0 ){
      this.caloriesRemaining = 0;
    }
    this.progressBar = info.percent / 100;
  }

  // function to expand today's meals list item 
  expandRow(data) {
    data.selected = !data.selected;
  }
  
  // function to open add meal modal
  async openModal() {
    const modal = await this.modalController.create({component: AddEventModalPage});

    modal.onDidDismiss()
      .then((response) => {
        if( response.data ){
          this.loadMeals();
        }        
    });

    return await modal.present();
  }

  // Alert to delete today's meals list
  async deleteItem(meal_id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'You are deleting this meal. Keep in mind that, by doing so, your nutritional goals and progress for the day will be recalibrated.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          cssClass: 'endDiet',
          handler: () => {
            this.removeMeal(meal_id);
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
