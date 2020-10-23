import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-view-video', 
  templateUrl: './view-video.html',
  styleUrls: ['./view-video.scss'],
})
export class ViewVideo implements OnInit {
public options:any = []
public items: any[];
public imgurlData:any;
public page:any;
public imgUrl:any
date ="September 29, 2020";
bodyFat = "15"
bodymass = "20"
weight = "150"
imgList =[{url :'../../../../assets/img/Capture-bang.PNG',selected:false},{url:'../../../../assets/img/Bang-prof.jpg',selected:false}]
isExpandImg = false
selectedImg = ""
url;
isFirstSelected = false;
isForthSelected = false;
isThirdSelected = false;
isSecondSelected = false;
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
    let data = false;
     if (this.isFirstSelected && this.isSecondSelected && this.isThirdSelected && this.isForthSelected) {
      data = true;
    }
    this.modalController.dismiss({isSetsDone : data});
  }
 
  onClickOfFirstSet() {
    this.isFirstSelected = !this.isFirstSelected;
  }
  onClickOfSecondSet() {
    this.isSecondSelected = !this.isSecondSelected;
  }
  onClickOfThirdSet() {
    this.isThirdSelected = !this.isThirdSelected;
  }
  onClickOfFourthSet() {
    this.isForthSelected = !this.isForthSelected;
  }
}