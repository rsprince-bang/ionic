import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalServicesService } from 'src/app/services/global-services.service';
import { FoodSuggestionsService } from 'src/app/services/food-suggestions.service';
import { ApiCallService } from 'src/app/services/api-call.service';
import { HomeAddFoodModalPage } from '../home-add-food-modal/home-add-food-modal.page';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import * as pluginLabels from 'chartjs-plugin-labels';
import { AddEventModalPage } from '../add-event-modal/add-event-modal.page';

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
  todaysMealsList = [{name: '10 Ounces of ribeye', cal: '769 cal.', selected: false},
  {name: '2 Ounces of broccoli', cal: '80 cal.', selected: false},
  {name: '1 Ounces of cheese', cal: '100 cal.', selected: false}]
  suggestionList =  [{name: 'Bang Keto Coffee- BCB', cal: '120 cal.', selected: false},
  {name: 'Pristine Protein WPI ', cal: '90 cal.', selected: false},
  {name: '8 KETO ZERO CARB', cal: '50 cal.', selected: false}]
  constructor( private globalServices: GlobalServicesService, private activatedRoute: ActivatedRoute,
    public router: Router, public alertController: AlertController
   , private foodSuggestionsService: FoodSuggestionsService, private myAPI: ApiCallService, private modalController: ModalController ) { }

  ngOnInit() {
    // PIE CHART SETTINGS
    this.pieChartOptions = this.createOptions();
    this.pieChartLabels = ['Protein', 'Carbs', 'Fat'];
    this.pieChartData = [50.4, 33.6, 15.9];
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
    //this.loadMeals();
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
      this.dateVal = this.dateVal + 1
    // if(this.dayNumberVal == 17) {
    //   this.dayNumberVal = this.dayNumberVal + 1
    //   this.dateVal = this.dateVal + 1
    // }else if(this.dayNumberVal == 19){
    //   this.dayNumberVal = this.dayNumberVal + 1
    //   this.dateVal = this.dateVal + 1
    // }else if(this.dayNumberVal == 18) {
    //   this.dayNumberVal = this.dayCount + 1
    //   this.dateVal = this.dateCount + 1
    //   }
    
    if(this.today){
      //won't swipe left tomorrow
    }else{
     
      this.globalServices.swipeLeft("/track-meal/" );
    }

  }

  handleSwipeRight() {
    this.dayNumberVal = this.dayNumberVal - 1
    this.dateVal = this.dateVal - 1
    // if(this.dayNumberVal == 17) {
    //   this.dayNumberVal = this.dayCount - 1
    //   this.dateVal = this.dateCount - 1
    // }else if(this.dayNumberVal == 19){
    //   this.dayNumberVal = this.dayNumberVal - 1
    //   this.dateVal = this.dateVal - 1
    // }else if(this.dayNumberVal == 18) {
    //   this.dayNumberVal = this.dayCount - 1
    //   this.dateVal = this.dateCount - 1
    // }
    if( this.dayNumber > 1 ){
      // this.dayNumberVal = this.dayCount - 1
      // this.dateVal = this.dateCount - 1
      this.globalServices.swipeRight("/track-meal/");
    }
  }

  loadMeals(){
    this.dayNutritionInfo = this.foodSuggestionsService.getDietDayDescription(this.date, this.planLength_weeks);
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
    // const modal = await this.modalController.create({
    //   component: HomeAddFoodModalPage,
    //   componentProps: { date: this.date }
    // });

    // modal.onDidDismiss()
    //   .then((response) => {
    //     if( response.data ){
    //       this.loadMeals();
    //     }        
    // });

    // return await modal.present();
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
  async deleteItem() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Do you want to delete the Item?',
      message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam consequuntur odit rerum quam repellat maxime, quidem nobis modi, quaerat culpa assumenda sint non asperiores quod dolore adipisci vero, fuga facere.',
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

          }
        }
      ]
    });

    await alert.present();
  }
}
