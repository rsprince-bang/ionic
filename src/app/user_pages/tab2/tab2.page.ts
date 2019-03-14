import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private router: Router) {}

  handleSwipeLeft(){

    this.router.navigateByUrl("/home/tabs/tab3");
  }

  handleSwipeRight(){

    this.router.navigateByUrl("/home/tabs/tab1");
  }

}
