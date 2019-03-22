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

  constructor(private router: Router, private globalServices: GlobalServicesService) { }

  handleSwipeLeft() {
    this.globalServices.swipeLeft("/home/tabs/tab3");
  }

  handleSwipeRight() {
    this.globalServices.swipeRight("/home/tabs/tab1");
  }

}
