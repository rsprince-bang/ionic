import { Component, OnInit } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
//import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { LocalNotifications, ELocalNotificationTriggerUnit, ILocalNotificationActionType, ILocalNotification } from '@ionic-native/local-notifications/ngx';


@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.page.html',
  styleUrls: ['./alerts.page.scss'],
})
export class AlertsPage implements OnInit {
  
  scheduled = [];

  constructor(private plt: Platform, private localNotifications: LocalNotifications, private alertCtrl: AlertController) {
    this.plt.ready().then(() => {
      this.localNotifications.on('click').subscribe(res => {
        let msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg);
      });
 
      this.localNotifications.on('trigger').subscribe(res => {
        let msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg);
      });
    });
  }

  ngOnInit() {
  }

  scheduleNotification() {
    this.localNotifications.schedule({
      id: 1,
      title: 'Attention',
      text: 'Simons Notification',
      data: { mydata: 'My hidden message this is' },
      trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND },
      foreground: true // Show the notification while app is open
    });
 
    // Works as well!
    // this.localNotifications.schedule({
    //   id: 1,
    //   title: 'Attention',
    //   text: 'Simons Notification',
    //   data: { mydata: 'My hidden message this is' },
    //   trigger: { at: new Date(new Date().getTime() + 5 * 1000) }
    // });
  }
 
  recurringNotification() {
    this.localNotifications.schedule({
      id: 22,
      title: 'Recurring',
      text: 'Simons Recurring Notification',
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
  }
 
  showAlert(header, sub, msg) {
    this.alertCtrl.create({
      header: header,
      subHeader: sub,
      message: msg,
      buttons: ['Ok']
    }).then(alert => alert.present());
  }
 
  getAll() {
    this.localNotifications.getAll().then((res: ILocalNotification[]) => {
      this.scheduled = res;
    })
  }



/* MY TEST
  sheduleNotification(){

    this.localNotifications.schedule({
      id:1,
      title: 'Test Title',
      text: 'Delayed ILocalNotification',
      data: { mydata: "hidden message fgoes here"},
      trigger: {at: new Date(new Date().getTime() + 10000)}, //10 seconds from now
      led: 'FF0000',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiBnKijUbBFZRLL8qFgrPiBJxrCLsFTvb0Qxu-DDhqa_OtCsU0',
      sound: this.setSound(),
      //foreground: true
   });
  
  }

  setSound() {
    if (this.plt.is('android')) {
      return 'file://assets/sounds/shame.mp3'
    } 
    else {
      return 'file://assets/sounds/bell.mp3'
    }
  }*/


}


