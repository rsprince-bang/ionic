import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiCallService } from 'src/app/services/api-call.service';
import { GlobalServicesService } from 'src/app/services/global-services.service';
import { CalendarComponent } from "ionic2-calendar/calendar";
import { FoodSuggestionsService } from 'src/app/services/food-suggestions.service';
import { NullViewportScroller } from '@angular/common/src/viewport_scroller';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  @ViewChild('daystemplate') daystemplate;
  @ViewChild(CalendarComponent) myCalendar:CalendarComponent;

  ngOnInit() {

  }


  title: string = null;;
  selectedDay = new Date();
  eventSource = [];
  //for specific date
  meals = [];
  exercises = [];
  workout_completed = false;
  date = null;
  info = null;
  score = 0;

  constructor(private myAPI: ApiCallService, private globalServices: GlobalServicesService, private foodSuggestionsService: FoodSuggestionsService) {

  }

  calendar = {
    mode: 'month',
    currentDate: this.selectedDay,
    dateFormatter: {
      formatMonthViewDay: function(date:Date) {
        return date.getDate().toString();
      }            
  }
  };

  onViewTitleChanged(title) {
    this.title = title;

    this.myAPI.makeAPIcall(
      "user_statistics.php",
      {
        "action": "getFoodsInRange",
        "rangeFrom": this.globalServices.getDateFromObject(this.daystemplate._projectedViews[0].context.view.dates[0].date),
        "rangeTo": this.globalServices.getDateFromObject(this.daystemplate._projectedViews[0].context.view.dates[41].date)
      },
      true
    ).subscribe((result) => {
      if (result.error) {
        this.myAPI.handleMyAPIError(result.error);
      }
      else {
        //returns an array of days with meals and exercises
        var planLength_weeks = this.foodSuggestionsService.getDietPlanWeeks();
        this.eventSource = [];
        for (let i = 0; i < result.success.daysInfo.length; i++){
          var dayCalorieInfo = this.foodSuggestionsService.getCaloriesPercentages(result.success.daysInfo[i].date.date_consumed, result.success.daysInfo[i].meals, result.success.daysInfo[i].exercises, planLength_weeks);
          var eventdate = result.success.daysInfo[i].date.date_consumed + " 00:00:00";

          //add to calendar
          this.eventSource.push({
            title: 'None',
            startTime: new Date(eventdate.replace(/-/g, '/')),
            endTime: new Date(eventdate.replace(/-/g, '/')),
            allDay: true,
            color: dayCalorieInfo.color
          });
        }

        this.myCalendar.loadEvents(); 
      }
    });
  }

  getEventClass(events) {
    if( events[0] ){
      return events[0].color;
    }
    else
      return '';
  }

  onCurrentDateChanged(ev: Date) {
    this.selectedDay = ev;
    var selectedDate = this.globalServices.getDateFromObject(ev);

    if( this.eventSource.length == 0 ){
      this.showDateStats( this.globalServices.getTodayDate() );
    }
    else{
      this.showDateStats(selectedDate);
    }
  }

  showDateStats(datestring){
    this.myAPI.makeAPIcall(
      "meals.php",
      {
        "action": "getDayInfo",
        "date": datestring
      },
      true
    ).subscribe((result) => {
      if (result.error) {
        this.myAPI.handleMyAPIError(result.error);
      }
      else {
        this.date = datestring;
        this.meals = result.success.dayInfo.meals;
        this.exercises = result.success.dayInfo.exercises;

        this.workout_completed = this.foodSuggestionsService.getWorkoutStatus(this.exercises);

        var planLength_weeks = this.foodSuggestionsService.getDietPlanWeeks();
        this.info = this.foodSuggestionsService.getCaloriesPercentages(datestring, this.meals, this.exercises, planLength_weeks);
        this.score = this.foodSuggestionsService.getScore(this.info.caloriesConsumed, this.info.dietCaloriesIntake, this.workout_completed, this.info.color, this.info.percent);
        //console.log(this.info);
      }
    });


  }

/*   onEventSelected(event) {
    console.log(event);
  } */


}
