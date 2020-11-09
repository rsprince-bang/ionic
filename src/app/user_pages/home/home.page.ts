import { title } from 'process';
import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalServicesService } from 'src/app/services/global-services.service';
import { ApiCallService } from 'src/app/services/api-call.service';
import { FoodSuggestionsService } from 'src/app/services/food-suggestions.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label, SingleDataSet } from 'ng2-charts';
import { reduce } from 'rxjs/operators';
import { AlertController, PopoverController } from '@ionic/angular';
import * as pluginLabels from 'chartjs-plugin-labels';
import { Chart } from 'chart.js';
import { ModalController } from '@ionic/angular';
import { AddSleepModalPage } from '../add-sleep-modal/add-sleep-modal.page';
import { AddWaterModalPage } from '../add-water-modal/add-water-modal.page';
import {NotificationModal} from '../modals/notification-modal/notification-modal';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  @ViewChild('barCanvas') barCanvas: ElementRef;
  @ViewChild('barIntakeCanvas') barIntakeCanvas: ElementRef;
  @ViewChild('barSleepCanvas') barSleepCanvas: ElementRef;
  private barIntake: Chart;
  private barChart: Chart;
  private barSleep: Chart;
  startDate = new Date(2020, 8, 11)
  selectedDate: any = moment(new Date(2020, 8, 29));
  currentRunningDate: any;
  day = null;
  date = null;
  dayNumber = null;
  planLength_weeks = null;
  planLength_days = null;
  warnText = {proteinText: '...', carbsText: '...', fatText: '...'};
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
  circleSubtitle = "";
  CurrentRunningDay;
  circleColor = "#2b2b2b"; //gray atr first
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
  onBodyFatSelect = false;
  onBodyMassSelect = false;
  OnWeightSelect = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(0,0,255,1.0)', 'rgba(255,165,0,1.0)', 'rgba(0,255,0,1.0)'],
    },
  ];
  data = [' ', '100g', ' ', 'of PROTEIN', ' '];
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [];
  bodyWeight = 3335;
  calculatedMaxWaterIntake;
  constructor(
    private router: Router,
    private globalServices: GlobalServicesService,
    private activatedRoute: ActivatedRoute,
    private myAPI: ApiCallService,
    private foodSuggestionsService: FoodSuggestionsService,
    private alertController: AlertController,
    private modalController: ModalController,
    private popoverController: PopoverController,
  ) { }

  ngOnInit() {
    // PIE CHART SETTINGS
    this.updateChart();
    this.currentRunningDate = moment(this.selectedDate.toDate()).format('MMMM DD, YYYY');
    this.CurrentRunningDay = this.calculateDiff();
    this.pieChartOptions = this.createOptions();
    this.pieChartLabels = ['Protein', 'Carbs', 'Fat'];
    this.pieChartData = [50.4, 33.6, 15.9];
    this.pieChartType = 'doughnut';
    this.pieChartLegend = true;
    this.pieChartPlugins = [pluginLabels];
    this.day = this.activatedRoute.snapshot.paramMap.get('day');
    if (!this.day) {
      this.day = 'today';
    }
    this.date = this.globalServices.getDate(this.day);
    this.calculatedMaxWaterIntake = (this.bodyWeight / 2) * 7;
  }
    // PIE CHART OPTIONS
  private createOptions(): ChartOptions {
    return {
      responsive: true,
          maintainAspectRatio: true,
          plugins: {
              labels: {
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
    //this.updatePage();
    //this.getFeedback();
  }

  handleSwipeLeft() {
    console.log("this.day",this.day)
    this.dayNumber = this.dayNumber+1
    if(this.dayNumber == 20) {
      this.day = 'tomorrow'
      // this.globalServices.swipeLeft("/tabs/home/tomorrow");
    }else if(this.dayNumber == 19) {
      console.log("today")
      this.day = 'today'
      // this.globalServices.swipeLeft("/tabs/home/today");
     }
    // switch (this.day) {
    //   case "yesterday": {
    //     this.globalServices.swipeLeft("/tabs/home/yesterday");
    //     break;
    //   }
    //   case "today": {
    //     this.globalServices.swipeLeft("/tabs/home/today");
    //     break;
    //   }
    //   default: {
    //    // cant swipe after tomorrow 
    //     break;
    //   }
    // }
  }

  handleSwipeRight() {
    this.dayNumber = this.dayNumber-1
    if(this.dayNumber == 18) {
      this.day = 'yesterday'
      // this.globalServices.swipeLeft("/tabs/home/yesterday");
    }else if(this.dayNumber == 19) {
      this.day = 'today'
      console.log("today")
      // this.globalServices.swipeLeft("/tabs/home/today");
     }
    // switch (this.day) {
    //   case "today": {
    //     if (this.dayNumber > 1) {
    //       //if its not your first day, then you can see previous day
    //       this.globalServices.swipeRight("/tabs/home/today");
    //     }
    //     break;
    //   }
    //   case "tomorrow": {
    //     this.globalServices.swipeRight("/tabs/home/tomorrow");
    //     break;
    //   }
    //   default: {
    //     //cant swipe before yesterday 
    //     break;
    //   }
    // }
  }

  doRefresh(event) {
    this.updatePage();
    event.target.complete();
  }

  updatePage() {
    this.dayNumber = this.foodSuggestionsService.getDietDayNumber(this.date);
    this.planLength_weeks = this.foodSuggestionsService.getDietPlanWeeks();
    this.planLength_days = this.planLength_weeks * 7;
    this.dayNutritionInfo = this.foodSuggestionsService.getDietDayDescription(this.date, this.planLength_weeks);
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

    if (info.color === 'red') {
      this.circleColor = '#CA1616';
    } else {
      this.circleColor = 'rgb(56, 129, 255';
    }
    this.circleSubtitle = this.caloriesConsumed + '/' + this.dietCaloriesIntake;
  }

  workoutCompleted() {
    if (this.workout_completed) {
      this.workout_completed_msn = 'Workout Completed';
    } else {
      this.workout_completed_msn = 'Need Workout';
    }

  }

  warnTextFunction( target, current) {
    let text = '';
    const difference = Math.floor(target - current);
    if ( target > current && this.caloriesConsumed > this.dietCaloriesIntake ){
      text =  'missing ' + difference + ' Calories';
    } else if (target > current) {
      text = 'need ' + difference + ' Calories';
    } else if ( target < current ) {
      text = 'consumed too much ' + difference + ' Calories';
    }
    return text;
  }

  dayNutritionOfFat(){
    let text = null;

    if (this.dayNutritionInfo.daynutrition.fat === undefined){
        text = '5%';
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

    const progressPercentage = ( this.dayNumber / this.planLength_days );
    return progressPercentage;

  }
  updateChart() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
        type: 'line',
        data:{
           /* week progress bar chart x-axis data */
            labels: ['1', '2', '3', '4', '5', '6', '7'],
            datasets: [{
                label: 'Weight',
                /* date of weight */
                data: [13, 10, 35, 30.25, 30, 37, 27],
                fill: false, borderColor: '#00ff00', backgroundColor: '#00ff00'},
                {label: 'Body Fat',
                /* date of body fat */
                data: [27.5, 27.5, 27.5, 27.5, 40, 35, 30],
                fill: false, borderColor: 'rgb(255,165,0)', backgroundColor: 'rgb(255,165,0)'
            }]
        },
        options: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              fontColor: 'white',
              usePointStyle: true, boxWidth: 8
            }
          },
          scales: {
            xAxes: [{
                gridLines: {
                    display: true,
                    color: '#CCC',
                  drawBorder: true,
                  drawTicks: false
                },
                ticks: {
                  fontColor: '#CCC',
                  padding: 10
                },
            }],
            yAxes: [{
                display: true,
                gridLines: {
                    display: true,
                    color: '#CCC',
                  drawBorder: true,
                  drawTicks: false,
                  tickMarkLength: 15

                },
                ticks: {
                  fontColor: '#CCC',
                  padding: 20,
                  min: 0,
                  max: 45, // Your absolute max value
                  callback: function (value) {
                    return value + '%'; // convert it to percentage
                  },
                },
                scaleLabel: {
                  display: true,
                },
            }],
        }
        }
    });
    this.barIntakeCanvas.nativeElement.height = 200;
    this.barIntakeCanvas.nativeElement.width = 300;
    const gradientStroke = this.barIntakeCanvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 300);
    gradientStroke.addColorStop(0, '#375DFF');
    gradientStroke.addColorStop(1, '#B02BEB');
    this.barChartLabels = ['1', '2', '3', '4', '5', '6', '7'];
    this.barChartData = [
      {data: [20, 30, 75, 80.25, 50, 67, 67], label: 'WEEK', fill: false, borderColor: 'red', backgroundColor: 'red'},
    ];
    this.barIntake = new Chart(this.barIntakeCanvas.nativeElement, {
      type: 'bar',
      data: {
         /* water chart x-axis data */
        labels: ['1', '2', '3', '4', '5', '6', '7'],
        datasets: [{
          data: [20, 30, 75, 80.25, 50, 67, 67],
          fill: true, borderColor: gradientStroke, backgroundColor: gradientStroke,
          datalabels: {
            display : false
          }},
        ],
      },
      options: {
        legend: {
          display: false
        },
        plugins: {
          datalabels: {
              display: false,
          },
          labels: {
            render: () => {}
          }
      },
        scales: {
          xAxes: [{
              gridLines: {
                  display: true,
                  color: 'white',
                drawBorder: true,
                drawTicks: false,
              },
              ticks: {
                fontColor: 'white',
                padding: 10
              },
          }],
          yAxes: [{
              display: true,
              gridLines: {
                  display: true,
                  color: 'white',
                drawBorder: true,
                drawTicks: false,
                tickMarkLength: 15

              },
              ticks: {
                fontColor: 'white',
                padding: 20
              },
          }],
      }
      }
  });
  this.barSleepCanvas.nativeElement.height = 200;
  this.barSleepCanvas.nativeElement.width = 300;
  const gradientStroke2 = this.barSleepCanvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 300);
  gradientStroke2.addColorStop(0, '#37C2F5');
  gradientStroke2.addColorStop(1, '#FF79E6');
  this.barSleep = new Chart(this.barSleepCanvas.nativeElement, {
    type: 'bar',
    data: {
      /* sleep chart x-axis data */
      labels: ['1', '2', '3', '4', '5', '6', '7'],
      /* datasets to used to represent to x-axis and y-axis graph values */
      datasets: [{
          label: ' WEEK',
          data: [4, 6, 7, 6, 6, 4, 8, 10],
          fill: false,
          borderColor: gradientStroke2, backgroundColor: gradientStroke2, datalabels: {
        }}
      ]
    },
    options: {
      legend: {
        display: false,
        position: 'bottom',
        labels: {
          fontColor: 'white',
          usePointStyle: true
        }
      },
      plugins: {
        datalabels: {
            display: false,
        },
        labels: {
          render: () => {}
        }
    },
      scales: {
        xAxes: [{
          gridLines: {
              display: true,
              color: 'white',
            drawBorder: true,
            drawTicks: false,
            tickMarkLength: 90
          },
          ticks: {
            fontColor: 'white',
            padding: 10
          },
      }],
      yAxes: [{
          display: true,
          gridLines: {
              display: true,
              color: 'white',
            drawBorder: true,
            drawTicks: false,
            tickMarkLength: 70

          },
          ticks: {
            fontColor: 'white',
            padding: 20,
            min: 2, // min value of y-axis data
            max: 10, // max value of y-axis data
            callback: function(value) {if (value % 2 === 0) {return value;}}
          },
      }],
    }
  }
});

}

clickOnBodyFat() {
  this.onBodyFatSelect = true;
 this.onBodyMassSelect = false;
  this.OnWeightSelect = false;
}

clickOnBodyMass() {
  this.onBodyFatSelect = false;
 this.onBodyMassSelect = true;
  this.OnWeightSelect = false;
}

clickOnWeight() {
  this.onBodyFatSelect = false;
 this.onBodyMassSelect = false;
  this.OnWeightSelect = true;
}

  async openSleepModal() {
    const modal = await this.modalController.create({component: AddSleepModalPage});
    return await modal.present();
  }
  
	async openWaterModal() {
    const modal = await this.modalController.create({component: AddWaterModalPage});
    return await modal.present();
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
   /* Function to return date on change of date in  datePicker */
   onDateChange($event) {
    this.currentRunningDate = moment(this.selectedDate.toDate()).format('MMMM DD, YYYY');
    this.CurrentRunningDay = this.calculateDiff();
   }
   /* function to calculate how many days  difference between two dates */ 
   calculateDiff() {
    const currentDate = this.startDate;
    const dateSent = new Date(this.selectedDate.toDate());
    if (dateSent < currentDate) {
      const noOfDays = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(),
      currentDate.getDate()) - Date.UTC(dateSent.getFullYear(),
      dateSent.getMonth(), dateSent.getDate()) ) / (1000 * 60 * 60 * 24));
      return noOfDays + 1;
    } else {
      const noOfDays =  Math.floor((Date.UTC(dateSent.getFullYear(),
      dateSent.getMonth(), dateSent.getDate()) - Date.UTC(currentDate.getFullYear(), currentDate.getMonth(),
      currentDate.getDate())) / (1000 * 60 * 60 * 24));
      return noOfDays + 1;
    }
  }
}
