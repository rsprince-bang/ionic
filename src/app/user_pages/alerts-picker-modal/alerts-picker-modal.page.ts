import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';


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
        this.selected_date = this.formatDate(date);
        this.selected_time = this.formatTime(date);
      });
    }
    else{
      //initialize for new alarm
      //var date = new Date();
      //this.selected_date = this.formatDate(date);
      //this.selected_time = this.formatTime(date);
    }
  }


  cancelModal(){
    this.modalController.dismiss();
  }


  saveAlarm(){
    this.modalController.dismiss({ "title":this.selected_title, "date":this.selected_date, "time":this.selected_time});
  }


  formatDate( date:Date): string{

    var dayN = date.getDate();
    var dayS = "";
    if( dayN < 10){
      dayS = "0" + dayN.toString();
    }
    else{
      dayS = dayN.toString();
    }

    var monthN = date.getMonth() + 1;
    var monthS = "";
    if( monthN < 10 ){
      monthS = "0" + monthN.toString();
    }
    else{
      monthS = monthN.toString();
    }

    var year = date.getFullYear();

    return `${year}-${monthS}-${dayS}`;
  }


  formatTime( date:Date): string{

    var hourN = date.getHours();
    var hourS = "";
    if( hourN < 10 ){
      hourS = "0" + hourN.toString();
    }
    else{
      hourS = hourN.toString();
    }

    var minutesN = date.getMinutes();
    var minutesS = "";
    if( minutesN < 10 ){
      minutesS = "0" + minutesN.toString();
    }
    else{
      minutesS = minutesN.toString();
    }

    return `${hourS}:${minutesS}`;
  }


}
