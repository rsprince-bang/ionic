import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalServicesService } from 'src/app/services/global-services.service';
import { ModalController } from '@ionic/angular';
import { TrackWorkoutModalPage } from '../track-workout-modal/track-workout-modal.page';

@Component({
  selector: 'app-track-workout',
  templateUrl: './track-workout.page.html',
  styleUrls: ['./track-workout.page.scss'],
})
export class TrackWorkoutPage implements OnInit {

  day = null;
  disablechecksmarks = false;
  randomWorkouts = [
    { name: 'Bench press', isChecked: true },
    { name: 'Squads', isChecked: false },
    { name: 'Curls', isChecked: true },
    { name: 'Pull ups', isChecked: true },
    { name: 'Chin ups', isChecked: false },
    { name: 'Push ups', isChecked: true },
    { name: 'Triceps extensions', isChecked: true },
    { name: 'Calves', isChecked: false },
    { name: 'Crunches', isChecked: false },
  ];
  todayWorkouts = [];

  constructor(private activatedRoute: ActivatedRoute, private globalServices: GlobalServicesService, private modalController: ModalController) { }

  ngOnInit() {
    this.day = this.activatedRoute.snapshot.paramMap.get('day');

    //get 2 random meals for testing stackoverflow func
    this.todayWorkouts = this.randomWorkouts.sort(() => .5 - Math.random()).slice(0, 2);

    //default day is 5 , i.e. 5 == today
    //if anyuthing before that will be disabled; anything after will be unchecked
    for (var i = 0; i < this.todayWorkouts.length; i++) {
      if (this.day < 5) {
        this.disablechecksmarks = true;
      }
      else if (this.day > 5) {
        this.todayWorkouts[i].isChecked = false;
      }
    }
  }


  handleSwipeLeft() {
    var nextday = parseInt(this.day) + 1;
    this.globalServices.swipeLeft("/track-workout/" + nextday);
  }


  handleSwipeRight() {
    if (this.day > 1) {
      var prevday = parseInt(this.day) - 1;
      this.globalServices.swipeRight("/track-workout/" + prevday);
    }
  }


  async openExersize(workout) {

    const modal = await this.modalController.create({
      component: TrackWorkoutModalPage,
      componentProps: { workout: workout }
    });

/*     modal.onDidDismiss()
      .then((response) => {
        console.log(response);
      }); */

    return await modal.present();
  }

}
