import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalServicesService } from 'src/app/services/global-services.service';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { HomeAddFoodModalPage } from '../home-add-food-modal/home-add-food-modal.page';
import { ApiCallService } from 'src/app/services/api-call.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  day = null;
  date = null;
  segment_choice = 'nutrition';
  dailyCaloriesIntake = null;
  dietCaloriesIntake = null;
  caloriesConsumed:number = 0;
  todaymeals = [];
  disabletoggles = false;
  percent:number = 0;
  circlesubtitle = "";
  circlecolor = "#c0c0c0"; //gray atr first

  constructor(private router: Router, private globalServices: GlobalServicesService, private activatedRoute: ActivatedRoute,
    private modalController: ModalController, public actionSheetController: ActionSheetController, private myAPI: ApiCallService) { 

  }

  ngOnInit() {
    this.day = this.activatedRoute.snapshot.paramMap.get('day');
    this.date = this.globalServices.getDate(this.day);

    if( !this.globalServices.hasDailyCaloriesIntake() ){
      this.router.navigateByUrl("/enter-measurements");
    }
 
  }

  ionViewWillEnter(){
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

  updatepage(){
    this.dailyCaloriesIntake = localStorage.getItem('dailyCaloriesIntake');
    this.dietCaloriesIntake = this.dailyCaloriesIntake - 200;

    //pull meals based on day
    if( this.day == "today" ){
      this.todaymeals = JSON.parse(localStorage.getItem('todayMeals'));
    }
    else{
      this.getFoodsList();
    }

    this.calculateCaloriesConsumed();
  }

  async addFoodModal(){
    const modal = await this.modalController.create({
      component: HomeAddFoodModalPage,
      componentProps: { day: this.day }
    });

    modal.onDidDismiss()
      .then((response) => {
        if( response.data ){
          this.addToList(response.data);
        }        
    });

    return await modal.present();
  }

  doRefresh(event) {
    this.getFoodsList();
    event.target.complete();
  }

  getFoodsList(){
    this.myAPI.makeAPIcall(
      "users.php", 
      {
        "action": "getFoodsList",
        "date": this.date
      },
      true
    ).subscribe((result)=>{
      if( result.error ){
        this.myAPI.handleMyAPIError(result.error);
      }
      else{
        this.todaymeals = result.success.foods;

        if( this.day == "yesterday" ){
          this.disabletoggles = true;
        }
        else if( this.day == "today" ){
          localStorage.setItem('todayMeals', JSON.stringify(result.success.foods));
        }
        else if( this.day == "tomorrow" ){
          
        }
    
        this.calculateCaloriesConsumed();
      }
    });
  }

  addToList(data){
    this.todaymeals.push({"id":data.meal_id, "meal_name": data.item.food_name, "calories": data.calories, "isChecked": true});
    localStorage.setItem('todayMeals', JSON.stringify(this.todaymeals));
    this.calculateCaloriesConsumed();
  }
  
  removeFromList(meal_id){
    this.todaymeals = this.todaymeals.filter( el => el.id != meal_id );
    localStorage.setItem('todayMeals', JSON.stringify(this.todaymeals));
    this.myAPI.makeSilentCall(
      "users.php", 
      {
        "action": "removeMeal",
        "meal_id": meal_id
      },
      true
    );
    this.calculateCaloriesConsumed();
  }

  calculateCaloriesConsumed(){
    //reset before accumulation duh
    this.caloriesConsumed = 0;

    for(let i=0; i<this.todaymeals.length; i++){
      this.caloriesConsumed = this.caloriesConsumed + parseInt(this.todaymeals[i].calories);
    }

    this.percent = this.caloriesConsumed*100/this.dietCaloriesIntake;
    if( this.percent> 100 ){
      this.circlecolor = "#CA1616";
    }
    else{
      this.circlecolor = "#2FB202";
    }
    this.circlesubtitle = this.caloriesConsumed+"/"+this.dietCaloriesIntake;
  }


  async presentActionSheet(meal_id, mealName) {
    if(this.day != "yesterday"){
      const actionSheet = await this.actionSheetController.create({
        header: mealName,
        buttons: [{
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.removeFromList(meal_id);
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
