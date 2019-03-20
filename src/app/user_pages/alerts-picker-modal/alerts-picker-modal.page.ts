import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-alerts-picker-modal',
  templateUrl: './alerts-picker-modal.page.html',
  styleUrls: ['./alerts-picker-modal.page.scss'],
})
export class AlertsPickerModalPage implements OnInit {

  selected_date = null;
  selected_time = null;
  selected_title = null;
  alarm_id = null;

  constructor(private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {
    this.alarm_id = this.navParams.get('alarm_id');
  }

  cancelModal(){
    this.modalController.dismiss();
  }

  saveAlarm(){
    this.modalController.dismiss({ "title":this.selected_title, "date":this.selected_date, "time":this.selected_time});
  }

}
