import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-viewImg',
  templateUrl: './view-img.html',
  styleUrls: ['./view-img.scss'],
})
export class ViewImg implements OnInit {
public options:any = []
public items: any[];
public imgurlData:any;
public page:any;
public imgUrl:any
date;
  constructor(public modalController: ModalController) { }

  ngOnInit() {
      this.imgUrl = this.imgurlData;
    this.page = this.page
    //   console.log("this.imgUrl",this.imgUrl)
    //   console.log("this.imgUrl",this.imgurlData)
    
  }
  closeModal() {
    console.log("inside dismiss");
    this.modalController.dismiss();
  }

}