import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApiCallService } from 'src/app/services/api-call.service';
import { UserInfoPage } from '../user-info/user-info.page';
import { SettingsService } from './settings.service';

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
    private settingsService: SettingsService,
    private myAPI: ApiCallService
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

  // Loop thru each day, check if its code is in weighinCodes, 
  // set selected to true.
  getWeighinDays() {
    this.days.forEach(item => {
      if(this.weighinCodes.includes(item.code)) {
        item.selected = true;
      }
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

  getCurrentSettings() {
    this.settingsService.getData()
    .subscribe(
      data => {
        this.notifications = data.notifications;
        this.lossGoal = data.lossGoal;
        this.weighinCodes = data.weighindays;
        this.getWeighinDays();
      },
      error => console.log(error)
    )
  }

  updateSettings() {
    console.log(this.notifications, this.lossGoal, this.setWeighinDays());
    this.myAPI.makeAPIcall(
      "settings",
      {
        "action": "settings",
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
        }
      }    
    )
  }

}
