import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Platform, AlertController } from '@ionic/angular';



@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.page.html',
  styleUrls: ['./alerts.page.scss'],
})
export class AlertsPage implements OnInit {

  constructor(private localNotifications: LocalNotifications, private plt: Platform, private alertCtrl: AlertController) { 

  }

  ngOnInit() {
  }


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
      foreground: true
   });
  
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


