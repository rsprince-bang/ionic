import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalServicesService } from 'src/app/services/global-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  day = null;
  segment_choice = 'nutrition';
  dailyCaloriesIntake = null;
  dietCaloriesIntake = null;

  constructor(private router: Router, private globalServices: GlobalServicesService, private activatedRoute: ActivatedRoute) { 

  }

  ngOnInit() {
    this.day = this.activatedRoute.snapshot.paramMap.get('day');
  }

  ionViewWillEnter(){
    //console.log("HomePage WillEnter");
    this.updatepage();
  }

  handleSwipeLeft() {
    switch(this.day) { 
      case "yesterday": { 
        this.globalServices.swipeLeft("/home/today");
        break; 
      } 
      case "today": { 
        this.globalServices.swipeLeft("/home/tomorrow");
        break; 
      } 
      default: { 
        //cant swipe past tomorrow 
        break;              
      } 
   }
  }

  handleSwipeRight() {
    switch(this.day) { 
      case "today": { 
        this.globalServices.swipeRight("/home/yesterday");
        break; 
      } 
      case "tomorrow": { 
        this.globalServices.swipeRight("/home/today");
        break; 
      } 
      default: { 
        //cant swipe before yesterday 
        break;              
      } 
   }
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
