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
    this.plt.ready().then( (rdy) => {
      this.localNotifications.on('click').subscribe( (notification) => {
        let json = JSON.parse(notification.data);

        alert(json);
      });
    });
  }

  ngOnInit() {
  }


  sheduleNotification(){

    this.localNotifications.schedule({
      id:1,
      title: 'Test Title',
      text: 'Delayed ILocalNotification',
      data: { mydata: "hidden message fgoes here"},
      trigger: {at: new Date(new Date().getTime() + 5000)},
      led: 'FF0000',
      sound: null
   });
  
  }
}
