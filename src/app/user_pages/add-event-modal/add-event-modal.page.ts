import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.page.html',
  styleUrls: ['./add-event-modal.page.scss'],
})
export class AddEventModalPage implements OnInit {
  todayWeight: number;
  weightRange: number[] = [];
  todayBMI: string;
  todayFat: string;
  todayDate = new Date(); 
  bmiRange = ['below 18', '19 - 24', '25 - 29', '30 - 34', '35 - 39', 'above 40'];
  fatRange = ['below 18', '19 - 24', '25 - 29', '30 - 34', '35 - 39', 'above 40'];

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    this.generateWeight(90, 300);
  }

  dismiss() {
    this.modalController.dismiss();
  }

  generateWeight(start, end) {
    for(let i=start; i <= end; i+= 5) {
      this.weightRange.push(i);
    }
    return this.weightRange;
  }

  addMeal() {
    console.log("Add Meal");
  }

  addWorkout() {
    console.log("Add Workout");
  }

  sendData() {
    console.log(this.todayWeight);
    console.log(this.todayBMI);
    console.log(this.todayFat);
  }

}
