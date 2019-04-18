import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalServicesService } from 'src/app/services/global-services.service';
import { ApiCallService } from 'src/app/services/api-call.service';
import { FoodSuggestionsService } from 'src/app/services/food-suggestions.service';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

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
  caloriesConsumed: number = 0;
  caloriesFromProteinAsP: number = 0;
  caloriesFromCarbsAsP: number = 0;
  caloriesFromFatAsP: number = 0;
  meals = [];
  exercises = [];
  workout_completed = false;
  percent: number = 0;
  circlesubtitle = "";
  circlecolor = "#c0c0c0"; //gray atr first
  dayNutritionInfo = { "phase": null, "phaseday": null, "daynutrition": { "protein": null, "carbs": null, "fat": null } }
  score:number = 0;
  //declare barcharts
  public barChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {enabled: false},
    hover: {mode: null},
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          //max: 1000,
          min: 0,
          display: false
        },
        gridLines: {
          display: false
        }
      }],
      xAxes: [{
        gridLines: {
          display: false
        }
      }]
    },
    plugins: {
      datalabels: {
/*         anchor: 'end',
        align: 'end',
        font: {
          size: 15,
        } */
        anchor: 'end',
        clamp : true,
        offset: 0,
        font: {
          size: 15,
        }
      }
    }
  };
  public barChartLabels: Label[] = ['protein', 'carbs', 'fat'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [1, 2, 3], label: 'Grams consumed', backgroundColor: "lightblue" },
    { data: [4, 5, 6], label: 'Limit', backgroundColor: "orange" }
  ];




  constructor(private router: Router, private globalServices: GlobalServicesService, private activatedRoute: ActivatedRoute, private myAPI: ApiCallService,
    private foodSuggestionsService: FoodSuggestionsService) {

  }

  ngOnInit() {
    this.day = this.activatedRoute.snapshot.paramMap.get('day');
    this.date = this.globalServices.getDate(this.day);

    if (!this.globalServices.hasDailyCaloriesIntake()) {
      this.router.navigateByUrl("/enter-measurements");
    }

  }

  ionViewWillEnter() {
    this.updatepage();
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
        //cant swipe past tomorrow 
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
    this.dayNutritionInfo = this.foodSuggestionsService.getDietDayDescription(this.date);

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

        this.calculateCaloriesConsumed();
      }
    });

  }

  calculateCaloriesConsumed() {
    var info = this.foodSuggestionsService.getCaloriesPercentages(this.date, this.meals, this.exercises);

    this.barChartData[0].data = [Math.round(info.caloriesFromProtein), Math.round(info.caloriesFromCarbs), Math.round(info.caloriesFromFat)];
    this.barChartData[1].data = [Math.round(info.targetCaloriesFromProtein), Math.round(info.targetCaloriesFromCarbs), Math.round(info.targetCaloriesFromFat)];

    this.caloriesConsumed = info.caloriesConsumed;
    this.caloriesFromProteinAsP = info.caloriesFromProteinAsP;
    this.caloriesFromCarbsAsP = info.caloriesFromCarbsAsP;
    this.caloriesFromFatAsP = info.caloriesFromFatAsP;
    this.dietCaloriesIntake = info.dietCaloriesIntake;
    this.percent = info.percent;

    if (info.color == "red") {
      this.circlecolor = "#CA1616";
    }
    else {
      this.circlecolor = "#2FB202"; //green
    }
    this.circlesubtitle = this.caloriesConsumed + "/" + this.dietCaloriesIntake;

    this.score = this.foodSuggestionsService.getScore(this.caloriesConsumed, this.dietCaloriesIntake, this.workout_completed, info.color, this.percent);
  }





}
