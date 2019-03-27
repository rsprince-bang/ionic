import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServicesService } from 'src/app/services/global-services.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  segment_choice = 'nutrition';
  dailyCaloriesIntake = null;
  dietCaloriesIntake = null;

  constructor(private router: Router, private globalServices: GlobalServicesService) { 

  }

  ionViewWillEnter(){
    console.log("ionViewWillEnter");
    this.updatepage();
  }


  handleSwipeLeft() {
    this.globalServices.swipeLeft("/home/tabs/tab3");
  }

  handleSwipeRight() {
    this.globalServices.swipeRight("/home/tabs/tab1");
  }


  doRefresh(event) {
    this.updatepage();
    event.target.complete();
  }

  updatepage(){
    if( !this.globalServices.hasDailyCaloriesIntake() ){
      this.router.navigateByUrl("/enter-measurements");
    }
    else{
      this.dailyCaloriesIntake = localStorage.getItem('dailyCaloriesIntake');
      this.dietCaloriesIntake = this.dailyCaloriesIntake - 200;
    }
    
  }
}
