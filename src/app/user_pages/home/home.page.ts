import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalServicesService } from 'src/app/services/global-services.service';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { HomeAddFoodModalPage } from '../home-add-food-modal/home-add-food-modal.page';
import { ApiCallService } from 'src/app/services/api-call.service';
import { FoodSuggestionsService } from 'src/app/services/food-suggestions.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  day = null;
  date = null;
  dayNumber = null;
  segment_choice = 'nutrition';
  dailyCaloriesIntake = null;
  dietCaloriesIntake = null;
  caloriesConsumed:number = 0;
  caloriesFromProtein:number =0;
  caloriesFromCarbs:number =0;
  caloriesFromFat:number =0;
  meals = [];
  disabletoggles = false;
  percent:number = 0;
  circlesubtitle = "";
  circlecolor = "#c0c0c0"; //gray atr first
  dayNutritionInfo = {"phase":null, "phaseday":null, "daynutrition":{"protein":null, "carbs":null, "fat":null}}

  constructor(private router: Router, private globalServices: GlobalServicesService, private activatedRoute: ActivatedRoute,
    private modalController: ModalController, public actionSheetController: ActionSheetController, private myAPI: ApiCallService,
    private foodSuggestionsService: FoodSuggestionsService) { 

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
    this.dayNumber = this.foodSuggestionsService.getDietDayNumber(this.date);
    this.dayNutritionInfo = this.foodSuggestionsService.getDietDayDescription(this.date);
    this.dailyCaloriesIntake = localStorage.getItem('dailyCaloriesIntake');
    this.dietCaloriesIntake = this.dailyCaloriesIntake - 200;

    let meals = JSON.parse(localStorage.getItem('homepageMeals'));
    this.meals = meals[this.day];

    this.calculateCaloriesConsumed();
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
        "yesterday": this.globalServices.getDate("yesterday"),
        "today": this.globalServices.getDate("today"),
        "tomorrow": this.globalServices.getDate("tomorrow")
      },
      true
    ).subscribe((result)=>{
      if( result.error ){
        this.myAPI.handleMyAPIError(result.error);
      }
      else{
        this.dayNumber = this.foodSuggestionsService.getDietDayNumber(this.date);
        this.dayNutritionInfo = this.foodSuggestionsService.getDietDayDescription(this.date);

        localStorage.setItem('homepageMeals', JSON.stringify(result.success.meals));
        this.meals = result.success.meals[this.day];

        for(let i=0; i<this.meals.length; i++){
          this.meals[i].isChecked = true;
        }

        if( this.day == "yesterday" ){
          this.disabletoggles = true;
        }
        else if( this.day == "today" ){

        }
        else if( this.day == "tomorrow" ){
          
        }
    
        this.calculateCaloriesConsumed();
      }
    });
  }

  addToList(data){
    this.meals.push({"id":data.meal_id, "meal_name": data.item.food_name, "calories": data.calories, 
    "protein":data.protein, "carbs":data.carbs, "fat":data.fat, "isChecked": true});

    let meals = JSON.parse(localStorage.getItem('homepageMeals'));
    meals[this.day] = this.meals;
    localStorage.setItem('homepageMeals', JSON.stringify(meals));

    this.calculateCaloriesConsumed();
  }
  
  removeFromList(meal_id){
    this.meals = this.meals.filter( el => el.id != meal_id );

    let meals = JSON.parse(localStorage.getItem('homepageMeals'));
    meals[this.day] = this.meals;
    localStorage.setItem('homepageMeals', JSON.stringify(meals));

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
    this.caloriesFromProtein =0;
    this.caloriesFromCarbs =0;
    this.caloriesFromFat =0;

    for(let i=0; i<this.meals.length; i++){
      this.caloriesConsumed = this.caloriesConsumed + parseInt(this.meals[i].calories);

      this.caloriesFromProtein = this.caloriesFromProtein + (this.meals[i].protein * 4);
      this.caloriesFromCarbs = this.caloriesFromCarbs + (this.meals[i].carbs * 4);
      this.caloriesFromFat = this.caloriesFromFat + (this.meals[i].fat * 9);
    }

    //we got the actual values for each, let just turn them into percentage
    if( this.meals.length > 0){
      let totalCaloriesFromFormula = this.caloriesFromProtein + this.caloriesFromCarbs + this.caloriesFromFat;
      this.caloriesFromProtein = Math.round(this.caloriesFromProtein*100/totalCaloriesFromFormula);
      this.caloriesFromCarbs = Math.round(this.caloriesFromCarbs*100/totalCaloriesFromFormula);
      this.caloriesFromFat = Math.round(this.caloriesFromFat*100/totalCaloriesFromFormula);
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
