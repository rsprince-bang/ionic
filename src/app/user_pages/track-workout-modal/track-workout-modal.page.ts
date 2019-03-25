import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-track-workout-modal',
  templateUrl: './track-workout-modal.page.html',
  styleUrls: ['./track-workout-modal.page.scss'],
})
export class TrackWorkoutModalPage implements OnInit {

  workout = null;

  constructor(private navParams: NavParams, private modalController: ModalController, private iab: InAppBrowser) { }

  ngOnInit() {
    this.workout = this.navParams.get('workout');
  }


  cancelModal() {
    this.modalController.dismiss();
  }


  watchonYoutube() {
    /*
    window.open(‘http://example.com’, ‘_system’);	Loads in the system browser
    window.open(‘http://example.com’, ‘_blank’);	Loads in the InAppBrowser
    window.open(‘http://example.com’, ‘_blank’, ‘location=no’);	Loads in the InAppBrowser with no location bar
    window.open(‘http://example.com’, ‘_self’);	Loads in the Cordova web view
    */

    const browser = this.iab.create('https://www.youtube.com/', '_system');


  }
}
