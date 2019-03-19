import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  constructor(private router: Router,  private nativePageTransitions: NativePageTransitions) {}

  handleSwipeLeft(){

    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
      slowdownfactor: -1
    }
    this.nativePageTransitions.slide(options);
    this.router.navigateByUrl("/home/tabs/tab2");
  }
}
