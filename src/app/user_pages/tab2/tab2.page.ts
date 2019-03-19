import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private router: Router, private nativePageTransitions: NativePageTransitions) { }

  /*
  options: NativeTransitionOptions = {
    direction: 'left',
    duration: 400,
    slowdownfactor: -1,
    //slidePixels: 20,
    //iosdelay: 100,
    //androiddelay: 150,
    //fixedPixelsTop: 0,
    //fixedPixelsBottom: 60
  }*/

  handleSwipeLeft() {

    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
      slowdownfactor: -1
    }
    this.nativePageTransitions.slide(options);
    this.router.navigateByUrl("/home/tabs/tab3");
  }

  handleSwipeRight() {

    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 400,
      slowdownfactor: -1
    }
    this.nativePageTransitions.slide(options);
    this.router.navigateByUrl("/home/tabs/tab1");
  }

}
