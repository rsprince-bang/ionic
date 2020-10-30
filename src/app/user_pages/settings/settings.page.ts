import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController,PopoverController } from '@ionic/angular';
import { ApiCallService } from 'src/app/services/api-call.service';
import { GlobalServicesService } from 'src/app/services/global-services.service';
import { UserInfoPage } from '../user-info/user-info.page';
import {NotificationModal} from '../modals/notification-modal/notification-modal';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  days: any[] = [
    {day:'S', code: 'sun', selected: false},
    {day:'M', code: 'mon', selected: false},
    {day:'T', code: 'tue', selected: false},
    {day:'W', code: 'wed', selected: false},
    {day:'T', code: 'thu', selected: false},
    {day:'F', code: 'fri', selected: false},
    {day:'S', code: 'sat', selected: false}
  ];

  lossOptions = [
    {name: "5 pounds", value: 5},
    {name: "10 pounds", value: 10},
    {name: "15 pounds", value: 15},
    {name: "20 pounds", value: 20}
  ];

  lossGoal: any;
  weighinCodes: any;
  notifications: any;
  currentWeighinDays: any;

  constructor(
    private router: Router,
    private modalController: ModalController,
    public popoverController: PopoverController,
    private myAPI: ApiCallService,
    private globalServices: GlobalServicesService
  ) { }

  ngOnInit() {
    this.getCurrentSettings();
  }

  resetDiet() {
    this.router.navigateByUrl('/reset-diet');
  }

  async openUserInfoModal() {
    const modal = await this.modalController.create({component: UserInfoPage});
    return await modal.present();
	}

  // function to select multiple weigh in days.
  select(item) {
    item.selected = !item.selected;  
  }
  // highlight selected Weighin Days.
  isActive(item) {
    return item.selected === item;
  };

  onSave() {
    this.updateSettings();
  }

  // For getSettings(). Loop thru each day, check if its code is in weighinCodes, 
  // set selected to true.
  getWeighinDays() {
    this.days.forEach(item => {
      if(this.weighinCodes && this.weighinCodes.includes(item.code)) {
        item.selected = true;
      }
      console.log("weighinDays: ", this.days);
    });
  }

	// loop thru 'days', push the selected items to weighInDays array.
	setWeighinDays() {
		this.weighinCodes = [];
		this.days.forEach(item => {
			if(item.selected) {
				this.weighinCodes.push(item.code);
			}
		});
		return this.weighinCodes;
	}

	// gets current settings from the endpoint
  getCurrentSettings() {
    console.log("Getting current settings");
    this.myAPI.makeAPIcall(
      "settings",
      {"action": "loadSettings"},
      true
    )
    .subscribe(
      response => {
        // handle error
        if( response.error ){
          this.myAPI.handleMyAPIError(response.error);
        } 
        // successful response
        else {
          let data = response.success;
          console.log(response);
          this.notifications = data.notifications;
          this.lossGoal = data.lossGoal;
          this.weighinCodes = data.weighinDays;
          console.log(this.weighinCodes);
          this.getWeighinDays(); // uses weighinCode to set "days", array of objects
          console.log(this.days);
        }
      },
      error => console.log(error)
    )
  }

  updateSettings() {
    console.log("updateSettings");
    this.myAPI.makeAPIcall(
      "settings",
      {
        "action": "saveSettings",
        "notifications": this.notifications,
        "lossGoal": this.lossGoal,
        "weighinDays": this.setWeighinDays()
      },
      true
    )
    .subscribe(
      response => {
        if( response.error ){
          this.myAPI.handleMyAPIError(response.error);
        } else {
          localStorage.setItem("goals", JSON.stringify(response.success.goals));
          if(this.notifications) {
            localStorage.setItem("alerts", JSON.stringify(response.success.alerts));
            this.globalServices.syncAlerts();
          } else {
            localStorage.removeItem("alerts");
            this.globalServices.clearAlerts();
          }
        }
      }    
    )
  }

  async handleButtonClick(ev) {
    const popover = await this.popoverController.create({
       component: NotificationModal,
       event: ev,
       translucent: true,
     });
     await popover.present();
     const { data } = await popover.onWillDismiss();
   }

   logout() {
    this.globalServices.logOut();
  }
}
