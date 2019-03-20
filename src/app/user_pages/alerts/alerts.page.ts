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
        this.scheduleNotification(this.modalResponse.data.title, this.modalResponse.data.date, this.modalResponse.data.time);
        this.getAllAlarms();
    });

    return await modal.present();
  }


  scheduleNotification(title, date, time) {

    //for id we will use the time 
    var notificationIdString = date + time;
    notificationIdString = notificationIdString.replace(/-/g, "");  //global
    notificationIdString = notificationIdString.replace(/:/g, "");
    var notificationIdInteger = parseFloat(notificationIdString);

    this.localNotifications.schedule({
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
    });
  }

  deleteAlartm(id){
    alert("delete alarm "+id+" here");
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
 
  getAllAlarms() {
    alert("getAlarm");
    this.localNotifications.getAll().then((res: ILocalNotification[]) => {
      this.scheduled = res;
    })
  }


  setSound() {
    if (this.plt.is('android')) {
      return 'file://assets/sounds/shame.mp3'
    } 
    else {
      return 'file://assets/sounds/bell.mp3'
    }
  }


}


