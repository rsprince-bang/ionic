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

  // currentDate: String = new Date().toISOString();
  date = new Date(); 
  currentDateTime: String = new Date(this.date.getTime() - this.date.getTimezoneOffset()*60000).toISOString();

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  select(item) {
    item.selected = !item.selected;
    // item.selected = true;   
  }

  isActive(item) {
    // return this.selected === item;
  };

  continue() {
    this.router.navigateByUrl("/enter-measurements");
  }


}
