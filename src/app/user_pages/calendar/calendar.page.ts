import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiCallService } from 'src/app/services/api-call.service';
import { GlobalServicesService } from 'src/app/services/global-services.service';
import { CalendarComponent } from "ionic2-calendar/calendar";
import { FoodSuggestionsService } from 'src/app/services/food-suggestions.service';

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
        for (let i = 0; i < result.success.daysInfo.length; i++){
          var dayCalorieInfo = this.foodSuggestionsService.getCaloriesPercentages(result.success.daysInfo[i].date.date_consumed, result.success.daysInfo[i].meals, result.success.daysInfo[i].exercises);

          var dateNoLeadingZeros = result.success.daysInfo[i].date.date_consumed.replace(/-0/g, "-");
          //add to calendar
          this.eventSource.push({
            title: 'None',
            startTime: new Date(dateNoLeadingZeros),
            endTime: new Date(dateNoLeadingZeros),
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
    //console.log('Currently viewed date: ' + ev);
    //console.log(this.eventSource);
  }

/*   onEventSelected(event) {
    console.log(event);
  } */


}
