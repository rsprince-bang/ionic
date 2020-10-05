import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/services/api-call.service';

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
    {name: "5 pounds", value: 5},
    {name: "10 pounds", value: 10},
    {name: "15 pounds", value: 15},
    {name: "20 pounds", value: 20}
  ]
  lossGoal: number;
  weighinDay: string;

  date = new Date(); 
  currentDateTime: String = new Date(this.date.getTime() - this.date.getTimezoneOffset()*60000).toISOString();

  constructor(
    private router: Router, private myAPI: ApiCallService
  ) { }

  ngOnInit() {
    this.lossGoal = 15;
  }

  // select(item) {
  //   item.selected = !item.selected;
  //   console.log(item.selected);
  //   // item.selected = true;   
  // }

  select(item) {
    this.weighinDay = item;
  }

  isActive(item) {
    return item.selected === item;
  };


  continue() {
    // console.log('weighinDays: ', this.days);
    // console.log('lossGoal: ', this.lossGoal);
    // console.log('weighTime: ', this.currentDateTime);
    // return;

    this.myAPI.makeAPIcall(
      "user", 
      {
        "action": "saveGoals",
        "pounds_to_loose": 15, //make dynamic
        "weight_in_day": "mon", //make dynamic
        "weight_in_time": "9:00" //make dynamic
      },
      true
    )
    .subscribe(
      (result) => {

        if( result.error ){
          this.myAPI.handleMyAPIError(result.error);
        }
        else{
          localStorage.setItem("goals", JSON.stringify(result.success));
          this.router.navigateByUrl("/enter-measurements");
        }
      }
    );
  }

}
