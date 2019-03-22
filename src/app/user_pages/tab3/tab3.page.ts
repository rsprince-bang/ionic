import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServicesService } from 'src/app/services/global-services.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  segment_choice = 'nutrition';
  
  constructor(private router: Router, private globalServices: GlobalServicesService) {}

  handleSwipeRight(){
    this.globalServices.swipeRight("/home/tabs/tab2");
  }
}
