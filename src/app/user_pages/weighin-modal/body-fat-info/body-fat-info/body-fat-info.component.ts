import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-body-fat-info',
  templateUrl: './body-fat-info.component.html',
  styleUrls: ['./body-fat-info.component.scss'],
})
export class BodyFatInfoComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }

}
