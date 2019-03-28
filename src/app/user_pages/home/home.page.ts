import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalServicesService } from 'src/app/services/global-services.service';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { HomeAddFoodModalPage } from '../home-add-food-modal/home-add-food-modal.page';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  day = null;
  segment_choice = 'nutrition';
  dailyCaloriesIntake = null;
  dietCaloriesIntake = null;
  todaymeals = [
    { name: 'Pizza', isChecked: false },
    { name: 'Beer', isChecked: false },
  ];
  disabletoggles = false;

  constructor(private router: Router, private globalServices: GlobalServicesService, private activatedRoute: ActivatedRoute,
    private modalController: ModalController, public actionSheetController: ActionSheetController, private foodService: FoodService) { 

  }

  ngOnInit() {
    this.day = this.activatedRoute.snapshot.paramMap.get('day');
    if( this.day == "yesterday"){
      this.disabletoggles = true;
    }
  }

  ionViewWillEnter(){
    //console.log("HomePage WillEnter");
    this.updatepage();
  }

  handleSwipeLeft() {
    switch(this.day) { 
      case "yesterday": { 
        this.globalServices.swipeLeft("/home/today");
        break; 
      } 
      case "today": { 
        this.globalServices.swipeLeft("/home/tomorrow");
        break; 
      } 
      default: { 
        //cant swipe past tomorrow 
        break;              
      } 
   }
  }

  handleSwipeRight() {
    switch(this.day) { 
      case "today": { 
        this.globalServices.swipeRight("/home/yesterday");
        break; 
      } 
      case "tomorrow": { 
        this.globalServices.swipeRight("/home/today");
        break; 
      } 
      default: { 
        //cant swipe before yesterday 
        break;              
      } 
   }
  }

  doRefresh(event) {
    this.updatepage();
    event.target.complete();
  }

  updatepage(){
    if( !this.globalServices.hasDailyCaloriesIntake() ){
      this.router.navigateByUrl("/enter-measurements");
    }
    else{
      this.dailyCaloriesIntake = localStorage.getItem('dailyCaloriesIntake');
      this.dietCaloriesIntake = this.dailyCaloriesIntake - 200;
    }

  }

  async addFoodModal(){

    const modal = await this.modalController.create({
      component: HomeAddFoodModalPage,
      componentProps: { foo: "bar" }
    });

    modal.onDidDismiss()
      .then((response) => {
        if( response.data ){
          this.addToList(response.data.title);
        }        
    });

    return await modal.present();
  }


  addToList(title){
    this.todaymeals.push({"name": title, "isChecked": true});
  }
  
  removeFromList(title){
    this.todaymeals = this.todaymeals.filter( el => el.name != title );
  }

  async presentActionSheet(mealName) {

    if(this.day != "yesterday"){
      const actionSheet = await this.actionSheetController.create({
        header: mealName,
        buttons: [{
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.removeFromList(mealName);
          }
        }, 
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        }]
      });
      await actionSheet.present();
    }


  }


}
