import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServicesService } from 'src/app/services/global-services.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  segment_choice = 'nutrition';
  
  constructor(private router: Router,  private globalServices: GlobalServicesService) {}

  handleSwipeLeft(){
    this.globalServices.swipeLeft("/home/tabs/tab2");
  }
}
