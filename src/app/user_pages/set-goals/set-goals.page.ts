import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/services/api-call.service';
import { GlobalServicesService } from 'src/app/services/global-services.service';

@Component({
  selector: 'set-goals',
  templateUrl: './set-goals.page.html',
  styleUrls: ['./set-goals.page.scss'],
})
export class SetGoalsPage implements OnInit {
  days: any[] = [
    {day:'S', code: 'sun', selected: false},
    {day:'M', code: 'mon', selected: false},
    {day:'T', code: 'tue', selected: false},
    {day:'W', code: 'wed', selected: false},
    {day:'T', code: 'thu', selected: false},
    {day:'F', code: 'fri', selected: false},
    {day:'S', code: 'sat', selected: false}
  ];
  lossOptions = [
    {name: "-30 lbs", value: -30},
    {name: "-25 lbs", value: -25},
    {name: "-20 lbs", value: -20},
    {name: "-15 lbs", value: -15},
    {name: "-10 lbs", value: -10},
    {name: "-5 lbs", value: -5},
    {name: "+5 lbs", value: +5},
    {name: "+10 lbs", value: +10},
    {name: "+15 lbs", value: +15},
    {name: "+20 lbs", value: +20},
    {name: "+25 lbs", value: +25},
    {name: "+30 lbs", value: +30},
  ]
  lossGoal: number;
  weighinDays: string[] = [];

  date = new Date(); 
  selected_time = null;
  isSubmitted = false;


  constructor(
    private router: Router, 
    private myAPI: ApiCallService, 
    private globalServices: GlobalServicesService
  ) { }

  ngOnInit() {
    // Default values
    // this.lossGoal = 5;
    // this.selected_time = this.globalServices.formatTime(this.date);
  }

  // function to select multiple weigh in days
  select(item) {
    item.selected = !item.selected;  
  }

  isActive(item) {
    return item.selected === item;
  };

  // function to select one weighin day.
  // select(item) {
  //   this.weighinDay = item;
  // }

  checkDays() {
    this.days.forEach(item => {
      if(item.selected) {
        if(this.weighinDays.includes(item.code)) {
          return;
        } 
        else {
          this.weighinDays.push(item.code);
        }
      }
    });
    return;
  }

  continue() {
    this.isSubmitted = true;
    this.weighinDays = [];

    if(!this.lossGoal || this.weighinDays.length != 0) {
      console.log("Missing fields - ", "goal: ", "days: ", this.weighinDays);
      return;
    }
    console.log({ lossGoal: this.lossGoal, weighinDays: this.weighinDays, time: this.selected_time });

    this.myAPI.makeAPIcall(
      "user", 
      {
        "action": "saveGoals",
        "pounds_to_loose": this.lossGoal,
        "weighinDays": this.weighinDays,
        "time": this.selected_time,
        "weekly_repeat": true
      },
      true
    )
    .subscribe(
      (result) => {

        if( result.error ){
          this.myAPI.handleMyAPIError(result.error);
        }
        else{
          localStorage.setItem("goals", JSON.stringify(result.success.goals));
          localStorage.setItem("alerts", JSON.stringify(result.success.alerts));
          this.globalServices.syncAlerts();

          this.router.navigateByUrl("/enter-measurements");
        }
      }
    );
  }

}
