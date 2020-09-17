import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    private router: Router
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

  continue() {
    this.sendData();
    this.router.navigateByUrl("/enter-measurements");
  }

  sendData() {
    console.log('weighinDays: ', this.days);
    console.log('lossGoal: ', this.lossGoal);
    console.log('weighTime: ', this.currentDateTime);
  }


}