import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private localNotifications: LocalNotifications) { }

  ngOnInit() {
    this.alarm_id = this.navParams.get('alarm_id');
    if( this.alarm_id != -1 ){
      this.localNotifications.get(this.alarm_id).then((notification)=>{
        this.selected_title = notification.text;
        var date = new Date( notification.trigger.at );
        this.selected_date = date.toLocaleDateString();
        this.selected_time = date.toLocaleTimeString();
      });
    }
  }

  cancelModal(){
    this.modalController.dismiss();
  }

  saveAlarm(){
    this.modalController.dismiss({ "title":this.selected_title, "date":this.selected_date, "time":this.selected_time});
  }

}
