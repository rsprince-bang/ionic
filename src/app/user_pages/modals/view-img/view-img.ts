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
date ="September 29, 2020";
bodyFat = "15"
bodymass = "20"
weight = "150"
imgList =['../../../../assets/img/Capture-bang.PNG','../../../../assets/img/Bang-prof.jpg']
isExpandImg = false
constructor(public modalController: ModalController) { }

  ngOnInit() {
    if(localStorage.getItem('todayBodyFat')) {
      this.bodyFat = JSON.parse(localStorage.getItem('todayBodyFat'))
    }
    if(localStorage.getItem('todayBodyMass')) {
      this.bodymass = JSON.parse(localStorage.getItem('todayBodyMass'))
    }
    if(localStorage.getItem('todayWeight')) {
      this.weight = JSON.parse(localStorage.getItem('todayWeight'))
    }
    this.imgUrl = this.imgurlData;
    this.page = this.page
    //   console.log("this.imgUrl",this.imgUrl)
    //   console.log("this.imgUrl",this.imgurlData)
    
  }
  closeModal() {
    console.log("inside dismiss");
    if(this.isExpandImg ) {
      this.page =""
    }else {
    this.modalController.dismiss();
    }
  }
  uploadPhoto() {
    this.modalController.dismiss({data:true});
  }
  expandimg(img) {
    this.page = 'viewImg'
    this.imgUrl = img
    this.isExpandImg = true
  }
}