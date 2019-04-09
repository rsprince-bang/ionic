import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiCallService } from 'src/app/services/api-call.service';
import { GlobalServicesService } from 'src/app/services/global-services.service';
import { CalendarComponent } from "ionic2-calendar/calendar";

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

  constructor(private myAPI: ApiCallService, private globalServices: GlobalServicesService) {

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
        //returns an array of days with total calories for each day
        var dailyCaloriesIntake = localStorage.getItem('dailyCaloriesIntake');
        var dietCaloriesIntake = parseInt(dailyCaloriesIntake) - 200;

        for (let i = 0; i < result.success.mealsInRange.length; i++) {
          if (parseInt(result.success.mealsInRange[i].totalCal) > dietCaloriesIntake) {
            result.success.mealsInRange[i].color = "red";
          }
          else {
            result.success.mealsInRange[i].color = "green";
          }

          var dateNoLeadingZeros = result.success.mealsInRange[i].date_consumed.replace(/-0/g, "-");
          //add to calendar
          this.eventSource.push({
            title: 'None',
            startTime: new Date(dateNoLeadingZeros),
            endTime: new Date(dateNoLeadingZeros),
            allDay: true,
            color: result.success.mealsInRange[i].color
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
  }

  onEventSelected(event) {
    console.log(event);
  }

  markDisabled = (date: Date) => {
    //var current = new Date();
    //return date < current;
    return false;
  };
}
