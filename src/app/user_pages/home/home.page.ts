import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalServicesService } from 'src/app/services/global-services.service';
import { ApiCallService } from 'src/app/services/api-call.service';
import { FoodSuggestionsService } from 'src/app/services/food-suggestions.service';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label, SingleDataSet } from 'ng2-charts';
import { reduce } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import * as pluginLabels from 'chartjs-plugin-labels';
import { Chart } from "chart.js";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  @ViewChild("barCanvas") barCanvas: ElementRef;
  private barChart: Chart;
  day = null;
  date = null;
  dayNumber = null;
  planLength_weeks = null;
  planLength_days = null;
  warnText= {proteinText:"...", carbsText:"...", fatText:"..."};
  segment_choice = 'nutrition';
  dailyCaloriesIntake = null;
  dietCaloriesIntake = null;
  caloriesConsumed: number = 0;
  caloriesFromProteinAsP: number = 0;
  caloriesFromCarbsAsP: number = 0;
  caloriesFromFatAsP: number = 0;
  warnCaloriesFromProteinAsP: number = 0;
  warnCaloriesFromCarbsAsP: number = 0;
  warnCaloriesFromFatAsP: number = 0;
  meals = [];
  exercises = [];
  workout_completed = false;
  workout_completed_msn ="";
  percent: number = 0;
  circlesubtitle = "";
  circlecolor = "#2b2b2b"; //gray atr first
  dayNutritionInfo = { "phase": null, "phaseday": null,"phasename":null , "daynutrition": { "protein": null, "carbs": null, "fat": null } }
  score:number = 0;
  progressPercentage = 0;

  // PIE CHART VARIABLES
  pieChartOptions: ChartOptions;
  pieChartLabels: Label[];
  pieChartData: SingleDataSet;
  pieChartType: ChartType;
  pieChartLegend: boolean;
  pieChartPlugins = [];
  onBodyFatSelect = false
  onBodyMassSelect = false;
  OnWeightSelecr = true
  public pieChartColors = [
    {
      backgroundColor: ['rgba(0,0,255,1.0)', 'rgba(255,165,0,1.0)', 'rgba(0,255,0,1.0)'],
    },
  ];
  data =[' ','100g',' ','of PROTEIN',' ']

  constructor(
    private router: Router, 
    private globalServices: GlobalServicesService, 
    private activatedRoute: ActivatedRoute, 
    private myAPI: ApiCallService,
    private foodSuggestionsService: FoodSuggestionsService, 
    private alertController: AlertController
  ) { }

  ngOnInit() {
    // PIE CHART SETTINGS
    this.updateChart()
    this.pieChartOptions = this.createOptions();
    this.pieChartLabels = ['Protein', 'Carbs', 'Fat'];
    this.pieChartData = [50.4, 33.6, 15.9];
    this.pieChartType = 'doughnut';
    this.pieChartLegend = true;
    this.pieChartPlugins = [pluginLabels];

    this.day = this.activatedRoute.snapshot.paramMap.get('day');
    this.date = this.globalServices.getDate(this.day);

    if (!this.globalServices.hasDailyCaloriesIntake()) {
      // this.router.navigateByUrl("/enter-measurements");
    }
    
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
              },
              
          },
          legend: {
            labels: {
              usePointStyle: true
            }
          }
    };
  }

  getAverages(array) {
    let sum = 0 ;
    let pieChartAvgs = [];
    array.forEach(item => sum += item);
    array.forEach(item => pieChartAvgs.push((item/sum) * 100));
    return pieChartAvgs;
  }

  ionViewWillEnter() {
    this.updatepage();
    this.getFeedback();
  }

  handleSwipeLeft() {
    switch (this.day) {
      case "yesterday": {
        this.globalServices.swipeLeft("/home/today");
        break;
      }
      case "today": {
        this.globalServices.swipeLeft("/home/tomorrow");
        break;
      }
      default: {
       // cant swipe after tomorrow 
        break;
      }
    }
  }

  handleSwipeRight() {
    switch (this.day) {
      case "today": {
        if (this.dayNumber > 1) {
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

  updatepage() {
    this.dayNumber = this.foodSuggestionsService.getDietDayNumber(this.date);
    this.planLength_weeks = this.foodSuggestionsService.getDietPlanWeeks();
    this.planLength_days = this.planLength_weeks * 7;
    this.dayNutritionInfo = this.foodSuggestionsService.getDietDayDescription(this.date, this.planLength_weeks);

    // this.pieChartLabels = ['Protein' + this.dayNutritionInfo.daynutrition.protein +'%', this.dayNutritionInfo.daynutrition.carbs+'%', this.daynutritionOfFat()];
    this.myAPI.makeAPIcall(
      "meals.php",
      {
        "action": "getDayInfo",
        "date": this.date
      },
      true
    ).subscribe((result) => {
      if (result.error) {
        this.myAPI.handleMyAPIError(result.error);
      }
      else {
        this.meals = result.success.dayInfo.meals;
        this.exercises = result.success.dayInfo.exercises;
        this.workout_completed = this.foodSuggestionsService.getWorkoutStatus(this.exercises);
        this.workoutCompleted();
        this.calculateCaloriesConsumed();
      }
    });

    this.progressPercentage = this.calculateDayCompletionPercentage();

  }

  calculateCaloriesConsumed() {
    var info = this.foodSuggestionsService.getCaloriesPercentages(this.date, this.meals, this.exercises, this.planLength_weeks);

    // this.barChartData[0].data = [Math.round(info.caloriesFromProtein), Math.round(info.caloriesFromCarbs), Math.round(info.caloriesFromFat)];
    // this.barChartData[1].data = [Math.round(info.targetCaloriesFromProtein), Math.round(info.targetCaloriesFromCarbs), Math.round(info.targetCaloriesFromFat)];

    this.caloriesConsumed = info.caloriesConsumed;
    this.caloriesFromProteinAsP = info.caloriesFromProteinAsP;
    this.caloriesFromCarbsAsP = info.caloriesFromCarbsAsP;
    this.caloriesFromFatAsP = info.caloriesFromFatAsP;
    this.dietCaloriesIntake = info.dietCaloriesIntake;
    this.percent = info.percent;


    this.warnText.proteinText = this.warnTextFunction(info.targetCaloriesFromProtein, info.caloriesFromProtein );
    this.warnText.carbsText = this.warnTextFunction(info.targetCaloriesFromCarbs, info.caloriesFromCarbs);
    this.warnText.fatText = this.warnTextFunction(info.targetCaloriesFromFat, info.caloriesFromFat);

    if (info.color == "red") {
      this.circlecolor = "#CA1616";
    }
    else {
      this.circlecolor = "rgb(56, 129, 255"; 
    }
    this.circlesubtitle = this.caloriesConsumed + "/" + this.dietCaloriesIntake;

    //this.score = this.foodSuggestionsService.getScore(this.caloriesConsumed, this.dietCaloriesIntake, this.workout_completed, info.color, this.percent);
  
  }

  workoutCompleted(){
    if(this.workout_completed){
      this.workout_completed_msn = " Workout Completed";
    }else{
      this.workout_completed_msn = "Need Workout";
    }

  }

  warnTextFunction( target, current){
    var text = '';
    var difference = Math.floor(target - current);
    
    if( target > current && this.caloriesConsumed > this.dietCaloriesIntake ){
      text = "missing " + difference + " Calories";
    }
    else if(target > current){
      text = "need " + difference + " Calories";
    }
    else if( target < current ){
      text = "consumed too much " + difference + " Calories";
    }
    return text;  
  }

  daynutritionOfFat(){
    var text = null;

    if (this.dayNutritionInfo.daynutrition.fat == undefined){
        text = '5%'
    }else {
      text = this.dayNutritionInfo.daynutrition.fat + '%'
    }
    return text;
  } 

  chartOptionsfontSize(){
    var windowSize = window.matchMedia('(min-width: 700px)')
    var fontSize = null;

    if (windowSize.matches){
        fontSize = 16;
    }else {
      fontSize = 11;
    }
    return fontSize;
  }

  getFeedback(){
    //this.dayNumber is stored in lcoal storage so it will be available at the time this functino gets called 

    if( this.dayNumber > 7 ){
      var current_week = Math.ceil( this.dayNumber / 7 );
      var lastFeedback = parseInt(localStorage.getItem("lastFeedback"));

      //after first week reduce calories by 200
      if( Number.isNaN(lastFeedback) ){
        this.updateFeedback('no', 2);
      }
      //every week after that ask if happy
      else if( lastFeedback < current_week ){
        this.showFeedbackConfirm(current_week);
      }
    }

  }

  async showFeedbackConfirm(current_week) {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you happy with your progress so far?',
      buttons: [
        {
            text: 'Yes',
            handler: () => {
              this.updateFeedback('yes', current_week);
            }
        },
        {
            text: 'No',
            handler: () => {
              this.updateFeedback('no', current_week);
            }
        }
    ]
    });
    await alert.present();
  }

  updateFeedback(feedback, weeknum){
    this.myAPI.makeAPIcall(
      "users.php", 
      {
        "action": "updateFeedback",
        "feedback": feedback,
        "weeknum": weeknum
      },
      true
    )
    .subscribe((result) => {
      if (result.error) {
        this.myAPI.handleMyAPIError(result.error);
      }
      else if(result.success){
        localStorage.setItem("lastFeedback", result.success.weeknum);
        localStorage.setItem("currentCaloriesIntake", result.success.currentCaloriesIntake);
        this.calculateCaloriesConsumed();
      }
    });
  }

  /* 
   * Calculate Day Completion Percentage
   *
   * @desc Calculate the percentage of days that a user has completed. This 
   *  number is used to create the Days Completed / Days Remaining progress bar.
   *
   * @return (float) progressPercentage The percentage of days that have been completed.
   *
   */
  calculateDayCompletionPercentage() {

    let progressPercentage = ( this.dayNumber / this.planLength_days );
    return progressPercentage;

  }
  updateChart() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
        type:'line',
        data:{
            labels:['Sun','MON', 'TUE','WED','THU','FRI','SAT'], 
            datasets:[{
                label:'LAST WEEK',
                data:[130,100,75,80.25,116,67,67],
                fill:false,borderColor:'#00ff00',backgroundColor:'#00ff00'},
                {label:'THIS WEEK',
                data:[27.5,27.5,27.5,27.5,50,55,60],
                fill:false,borderColor:'rgb(255,165,0)',backgroundColor:'rgb(255,165,0)'
            }]
        },
        options: {
          legend: {
            display: true,
            position: "bottom",
            labels:{
              fontColor:'white',
              usePointStyle: true
            }
          },
          scales: {
            xAxes: [{ 
              
                gridLines: {
                    display: true,
                    color: "#CCC",
                  drawBorder:true,
                  drawTicks:false
                },
                ticks: {
                  fontColor: "#CCC",
                  padding:10
                },
            }],
            yAxes: [{
                display: true,
                gridLines: {
                    display: true,
                    color: "#CCC",
                  drawBorder:true,
                  drawTicks:false,
                  tickMarkLength: 15  

                },
                ticks: {
                  fontColor: "#CCC",
                  padding:20
                },
            }],
        }
        }
    });

}
clickOnBodyFat() {
  this.onBodyFatSelect = true
 this.onBodyMassSelect = false;
  this.OnWeightSelecr = false
}
clickOnBodyMass() {
  this.onBodyFatSelect = false
 this.onBodyMassSelect = true;
  this.OnWeightSelecr = false
}
clickOnWeight() {
  this.onBodyFatSelect = false
 this.onBodyMassSelect = false;
  this.OnWeightSelecr = true
}
  
}
