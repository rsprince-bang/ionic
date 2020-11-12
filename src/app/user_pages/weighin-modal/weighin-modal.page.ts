import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-weighin-modal',
  templateUrl: './weighin-modal.page.html',
  styleUrls: ['./weighin-modal.page.scss'],
})
export class WeighinModalPage implements OnInit {
  today = new Date();
	date = this.datePipe.transform(this.today, 'yyyy-MM-dd');

  constructor(
    public modalController: ModalController,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
