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
    {day:'mon', selected: false},
    {day:'tue', selected: false},
    {day:'wed', selected: false},
    {day:'thu', selected: false},
    {day:'fri', selected: false}
  ];
  lossOptions = [
    {name: "5 pounds", value: 5},
    {name: "10 pounds", value: 10},
    {name: "15 pounds", value: 15},
    {name: "20 pounds", value: 20}
  ]
  lossGoal: number;

  date = new Date(); 
  currentDateTime: String = new Date(this.date.getTime() - this.date.getTimezoneOffset()*60000).toISOString();

  constructor(
    private router: Router, private myAPI: ApiCallService
  ) { }

  ngOnInit() {
    this.lossGoal = 5;
  }

  select(item) {
    item.selected = !item.selected;
    // item.selected = true;   
  }

  isActive(item) {
    // return this.selected === item;
  };

  // continue() {
  //   this.sendData();
  //   this.router.navigateByUrl("/enter-measurements");
  // }

  // sendData() {
  //   console.log('weighinDays: ', this.days);
  //   console.log('lossGoal: ', this.lossGoal);
  //   console.log('weighTime: ', this.currentDateTime);
  // }

  // continue() {
  //   this.myAPI.makeAPIcall(
  //     "user", 
  //     {
  //       "action": "saveGoals",
  //       "pounds_to_loose": 15, //make dynamic
  //       "weight_in_day": "mon", //make dynamic
  //       "weight_in_time": "9:00" //make dynamic
  //     }
  //   )
  //   .subscribe(
  //     (result) => {
  //       this.userInfo = result;

  //       if( this.userInfo.error ){
  //         this.presentToastWithOptions(this.userInfo.error);
  //       }
  //       else if(this.userInfo.success){
  //         localStorage.setItem("token", this.userInfo.success.token);
  //         localStorage.setItem("user_id", this.userInfo.success.user_id);
  //         this.events.publish("user logged in", 1111, 2222); //test passsing args

  //         if( this.userInfo.success.user.goals.length == 0 ){
  //           //user never filled out goals
  //           //this.router.navigateByUrl("/set-goals");
  //           this.router.navigateByUrl("/welcome");
  //         }
  //         else if( this.userInfo.success.user.measurements.length == 0 ){
  //           //user never filled out measurements
  //           this.router.navigateByUrl("/enter-measurements");
  //         }
  //         else{
  //           //localStorage.setItem('diet_start_date', JSON.stringify(result.success.diet_start_date));
  //           //localStorage.setItem('dailyCaloriesIntake', this.userInfo.success.dailyCaloriesIntake);
  //           //localStorage.setItem("currentCaloriesIntake", result.success.currentCaloriesIntake);
  //           //localStorage.setItem("lastFeedback", result.success.lastFeedback);
  //           //localStorage.setItem('diet_plan_length', result.success.plan_length);
  //           this.router.navigateByUrl("tabs/home");
  //         }
  //       }
  //       else{
  //         this.presentToastWithOptions("Something went wrong, please try again later.");
  //       }
  //     }
  //   );
  // }

}
