import { Component, OnInit, Renderer2, ElementRef, ViewChild  } from '@angular/core';
import { ModalController, PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.html',
  styleUrls: ['./notification-modal.scss'], 
})
export class NotificationModal implements OnInit {
  @ViewChild('backgroundColor') backgroundColor: ElementRef;
public options: any = [];
public items: any[];
public imgUrlData: any;
public page: any;
public imgUrl: any;
notificationList: any = [{time: '8:00 AM', name: 'Weigh in', selected: false},
{time: '9:00 AM', name: 'Workout 1', selected: false},
{time: '12:00 PM', name: 'Light Snack', selected: false},
{time: '2:00 PM', name: 'Nap time, body!', selected: false}];
showLoader = false;
colorList = ['#FFE9BF', '#D5F9D5', '#c9e5ee', '#f5dae6', '#c3c0e5'];
  constructor(public modalController: PopoverController, private rd: Renderer2) { }

  ngOnInit() {
    this.showLoader = true;
    this.imgUrl = this.imgUrlData;
    this.page = this.page;
  }
  closeModal() {
    this.modalController.dismiss();
  }
  /* To remove viewed notification
  @input -object and  index*/
  clickOnNotification(dataObj, index) {
    dataObj.selected = !dataObj.selected;
    setTimeout(eve => {
      this.notificationList.splice(index, 1);
    }, 2000);
  }
}
