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
notificationList: any = [{desc: '8:00 AM - Weigh in', color: ''},
{desc: '9:00 AM - Workout 1', color: ''},
{desc: '12:00 PM - Light Snack', color: ''},
{desc: '2:00 PM - Nap time, body!', color: ''}];
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
  changeColour(i, backgroundColor) {
    this.rd.setStyle(this.backgroundColor.nativeElement, 'background-color', this.notificationList[i].color);
  }
}
