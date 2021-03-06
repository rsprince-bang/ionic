import { Component, OnInit } from '@angular/core';
import { Platform, AlertController, ModalController } from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit, ILocalNotificationActionType, ILocalNotification } from '@ionic-native/local-notifications/ngx';
import { AlertsPickerModalPage } from '../alerts-picker-modal/alerts-picker-modal.page';




@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.page.html',
  styleUrls: ['./alerts.page.scss'],
})
export class AlertsPage implements OnInit {
  
  scheduled = [];
  modalResponse = null;

  constructor(
    private plt: Platform, 
    private localNotifications: LocalNotifications, 
    private alertCtrl: AlertController,
    private modalController: ModalController
    ) {

    /*
    this.plt.ready().then(() => {
      this.localNotifications.on('click').subscribe(res => {
        let msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg);
      });
 
      this.localNotifications.on('trigger').subscribe(res => {
        let msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg);
      });
    });*/
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getAllAlarms();
  }

  async openModal(alarm_id){

    const modal = await this.modalController.create({
      component: AlertsPickerModalPage,
      componentProps: { alarm_id: alarm_id }
    });

    modal.onDidDismiss()
      .then((response) => {
        this.modalResponse = response;
        this.scheduleNotification(this.modalResponse.data.title, this.modalResponse.data.date, this.modalResponse.data.time, alarm_id);
    });

    return await modal.present();
  }


  scheduleNotification(title, date, time, alarm_id) {

    var notificationIdString = date + time;
    notificationIdString = notificationIdString.replace(/-/g, "");  //global
    notificationIdString = notificationIdString.replace(/:/g, "");
    var notificationIdInteger = parseFloat(notificationIdString);

    let options = {
      id: notificationIdInteger,
      title: 'Alert',
      text: title,
      data: { mydata: 'My hidden message' },
     // trigger: { in: 6, unit: ELocalNotificationTriggerUnit.SECOND },
      trigger: { at: new Date(date+"T"+time+":00") },
      lockscreen: true,
      foreground: true, // Show the notification while app is open
      //led: 'FF0000',
      //icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiBnKijUbBFZRLL8qFgrPiBJxrCLsFTvb0Qxu-DDhqa_OtCsU0',
      //sound: this.setSound()
    }
    this.localNotifications.schedule(options);

    //call the delete function wich in turn will call the getAlarms function to update main page,
    //it bugs out of first try after app restart and then i works
    //added refresher for now
    this.deleteAlarm(alarm_id);


  }


  getAllAlarms() {
    this.localNotifications.getAll().then((res: ILocalNotification[]) => {
      this.scheduled = res;
      this.translateDateTime();
    })
  }


  deleteAlarm(id){
    this.localNotifications.clear(id).then(()=>{
      this.getAllAlarms();
    });
  }
 

  doRefresh(event) {
    this.getAllAlarms();
    event.target.complete();
  }


  translateDateTime(){
    for ( var i = 0; i < this.scheduled.length; i++) { 
      var date = new Date( this.scheduled[i].trigger.at );
      this.scheduled[i].date = date.toLocaleDateString();
      this.scheduled[i].time = date.toLocaleTimeString().replace(/:\d{2}\s/,' '); //remove seconds
    }
  }

  /*
  recurringNotification() {
    this.localNotifications.schedule({
      id: 22,
      title: 'Recurring',
      text: 'Recurring every ',
      trigger: { every: ELocalNotificationTriggerUnit.MINUTE }
    });
  }
 
  repeatingDaily() {
    this.localNotifications.schedule({
      id: 42,
      title: 'Good Morning',
      text: 'Code something epic today!',
      trigger: { every: { hour: 9, minute: 30 } }
    });
  }*/
 

  showAlert(header, sub, msg) {
    this.alertCtrl.create({
      header: header,
      subHeader: sub,
      message: msg,
      buttons: ['Ok']
    }).then(alert => alert.present());
  }


  setSound() {
    if (this.plt.is('android')) {
      return 'file://assets/sounds/shame.mp3'
    } 
    else {
      return 'file://assets/sounds/bell.mp3'
    }
  }

  /*
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
  */
 
}


