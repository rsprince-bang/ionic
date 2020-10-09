import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Plugins, LocalNotification } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalServicesService {

  constructor(private router: Router, /*private nativePageTransitions: NativePageTransitions, */ private navCtrl: NavController, private http: HttpClient, 
    private iab: InAppBrowser) { }

  isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    else {
      return false;
    }
  }


  async logOut() {

    //I cant include the API service in this file because
    //circular includes happen...
    // so do a manual post
    this.http.post(
      environment.API_URL + "users.php",
      JSON.stringify({
        "action": "logout",
        "user_id": localStorage.getItem("user_id"),
        "token": localStorage.getItem("token")
      }),
      { headers: new HttpHeaders({}) }
    ).subscribe(() => {
      //do nothing
    });

    localStorage.clear();
    await this.clearAlerts();
    this.router.navigateByUrl("/login");
  }


  swipeLeft(url: string) {
    // let options: NativeTransitionOptions = {
    //   direction: 'left',
    //   duration: 400,
    //   slowdownfactor: -1
    // }
    // this.nativePageTransitions.slide(options);
    //this.router.navigateByUrl(url);

    this.navCtrl.navigateForward(url);
  }

  swipeRight(url) {
    console.log("url",url)
    // let options: NativeTransitionOptions = {
    //   direction: 'right',
    //   duration: 400,
    //   slowdownfactor: -1
    // }
    // this.nativePageTransitions.slide(options);
    //this.router.navigateByUrl(url);

    this.navCtrl.navigateBack(url);
  }


  hasDailyCaloriesIntake() {
    let dailyCaloriesIntake = localStorage.getItem('dailyCaloriesIntake');
    if (dailyCaloriesIntake) {
      return true;
    }
    else {
      return false;
    }
  }

  getTodayDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var today_string = yyyy + '-' + mm + '-' + dd;

    return today_string;
  }

  getPreviousDate(date){
    var d_string = date + " 00:00:00";
    var currentdate = new Date(d_string.replace(/-/g, '/'));

    var yesterday = new Date(currentdate);
    yesterday.setDate(currentdate.getDate() - 1);

    var dd = String(yesterday.getDate()).padStart(2, '0'); //yesterday's date
    var mm = String(yesterday.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = yesterday.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
  }

  getNextDate(date){
    var d_string = date + " 00:00:00";
    var currentdate = new Date(d_string.replace(/-/g, '/'));

    var tomorrow = new Date(currentdate);
    tomorrow.setDate(currentdate.getDate() + 1);

    var dd = String(tomorrow.getDate()).padStart(2, '0'); //yesterday's date
    var mm = String(tomorrow.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = tomorrow.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
  }

  getDate(day) {
    //day must be yesterday, today, tomorrow

    var day_string = null;
    if (day == "yesterday") {
      var today = new Date();

      var yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      var dd = String(yesterday.getDate()).padStart(2, '0'); //yesterday's date
      var mm = String(yesterday.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = yesterday.getFullYear();

      day_string = yyyy + '-' + mm + '-' + dd;
    }
    else if (day == "today") {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      day_string = yyyy + '-' + mm + '-' + dd;
    }
    else if (day == "tomorrow") {
      var today = new Date();

      var tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      var dd = String(tomorrow.getDate()).padStart(2, '0'); //tomorrow's date
      var mm = String(tomorrow.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = tomorrow.getFullYear();

      day_string = yyyy + '-' + mm + '-' + dd;
    }

    return day_string;
  }


  getDateFromObject(dateObject:Date) {

    var dd = String(dateObject.getDate()).padStart(2, '0');
    var mm = String(dateObject.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = dateObject.getFullYear();

    var string = yyyy + '-' + mm + '-' + dd;

    return string;
  }


  getDateAsHumanString(datestring){
    //var dateObj = new Date(datestring + " 00:00:00");
    var d_string = datestring + " 00:00:00";
    var dateObj = new Date(d_string.replace(/-/g, '/'));

    return  dateObj.toDateString();
  }


  openLink(link, type){
    /*
    window.open(‘http://example.com’, ‘_system’);	Loads in the system browser
    window.open(‘http://example.com’, ‘_blank’);	Loads in the InAppBrowser
    window.open(‘http://example.com’, ‘_blank’, ‘location=no’);	Loads in the InAppBrowser with no location bar
    window.open(‘http://example.com’, ‘_self’);	Loads in the Cordova web view
    */

   const browser = this.iab.create(link, type);
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

  //Alerts will be save in database and local storage, so we have a list of them. THey will need to be wiped when user logs out.
  //and reset when user logs in
  async syncAlerts(alertsJson){
    const device = await Plugins.Device.getInfo();
    if( device.platform == 'android' || device.platform == 'ios' ){
      await Plugins.LocalNotifications.requestPermission();

      //first clear existing alerts
      await this.clearAlerts();

      //TODO set alerts in loop based on set diet plan,
      //if no diet plan then set one alert, then call this function again when diet plan is set to (7,12)
      alert( JSON.stringify( localStorage.getItem("alerts") ) );
      alert( localStorage.getItem("diet_plan_length") );
      return;

      for(var i=0;i< alertsJson.length; i++){
        //add local notifications
        let dateString = alertsJson[i].date+'T'+alertsJson[i].time;
        let alarmDateTime = new Date(dateString);

        //local notifications won't trigger if date is in the past even though it is set to e re-occuring, fml
        var nowDateTime = new Date();
        var alarmDateTimeInMS = alarmDateTime.getTime(); //returns the number of milliseconds since midnight, January 1, 1970.
        var nowDateTimeMS = nowDateTime.getTime(); //returns the number of milliseconds since midnight, January 1, 1970.

        //if alarm is in the past keep adding 7 days until we get a date in the future
        while (alarmDateTimeInMS < nowDateTimeMS) {
          alarmDateTime.setDate(alarmDateTime.getDate() + 7);
          alarmDateTimeInMS = alarmDateTime.getTime();
        }

        const notifs = await Plugins.LocalNotifications.schedule({
          notifications: [
            {
              title: "Reminder",
              body: "Time to weight in",
              id: alertsJson[i].id,
              schedule: { 
                at: alarmDateTime,
              }
            }
          ]
        });
      }
    }

    //testing
    Plugins.LocalNotifications.addListener('localNotificationReceived', (notification: LocalNotification) =>{
      alert(notification.title);
    });
  }

  async clearAlerts(){
    const device = await Plugins.Device.getInfo();
    if( device.platform == 'android' || device.platform == 'ios' ){
      const pending = await Plugins.LocalNotifications.getPending();
      if( pending.notifications.length > 0 ){
        await Plugins.LocalNotifications.cancel(pending);
      }
    }  
  }

}
