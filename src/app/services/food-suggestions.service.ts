import { Injectable } from '@angular/core';


export enum Phases{
  one = "I",  //30
  two = "II", //30
  three = "III" //24
}

@Injectable({
  providedIn: 'root'
})


export class FoodSuggestionsService {

  phases = [];
  charts = [];
  
  constructor() {

    //define phase one days
    this.phases[Phases.one] = [];
    this.phases[Phases.one][1] = {"protein":50, "carbs":50};
    this.phases[Phases.one][2] = {"protein":60, "fat":30, "carbs": 10};
    this.phases[Phases.one][3] = {"protein":60, "fat":30, "carbs": 10};

     //define phase two days
    this.phases[Phases.two] = [];
    this.phases[Phases.two][1] = {"protein":50, "carbs":50};
    this.phases[Phases.two][2] = {"protein":60, "fat":30, "carbs":10};

    //define phase three days
    this.phases[Phases.three] = [];
    this.phases[Phases.three][1] = {"protein":50, "carbs":30, "fat":20};

  }
  
  
  

  getDietDayNumber(date){

    var dateRegistered = new Date(JSON.parse(localStorage.getItem('date_registered')));
    var dateRequested = new Date(date);

    var diffTime = (dateRequested.getTime() - dateRegistered.getTime());
    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays+1; //cuz if resitered today its day 1 not day zero
  }

  getDietDayDescription(date){
    //date = "2019-04-13";
    let daynumber = this.getDietDayNumber(date);
    let phase = "";
    let phaseday = null;

    if(daynumber >= 1 && daynumber <= 30){
      phase = Phases.one;
      phaseday = daynumber % 3; //because 3 days in phase one
      if(phaseday == 0){
        phaseday = 3;
      }
    }
    else if(daynumber >= 31 && daynumber <= 60){
      phase = Phases.two;
      phaseday = daynumber % 2; //2 days in phase two
      if(phaseday == 0){
        phaseday = 2;
      }
    }
    else{
      phase = Phases.three;
      phaseday = 1; //it always day one in phase three
    }

    return {"phase":phase, "phaseday":phaseday, "daynutrition":this.phases[phase][phaseday]};
  }


  getCaloriesPercentages(date, meals, exercises){
    var caloriesConsumed = 0;
    var caloriesFromProtein =0;
    var caloriesFromCarbs =0;
    var caloriesFromFat =0;
    var dietCaloriesIntake = parseInt(localStorage.getItem('dailyCaloriesIntake')) - 200;
    var eat_extra_protein = false;

    for(let i=0; i<meals.length; i++){
      caloriesConsumed = caloriesConsumed + parseInt(meals[i].calories);

      caloriesFromProtein = caloriesFromProtein + (meals[i].protein * 4);
      caloriesFromCarbs = caloriesFromCarbs + (meals[i].carbs * 4);
      caloriesFromFat = caloriesFromFat + (meals[i].fat * 9);
    }

    //if they worked out they can eat more calories
    for(let i=0; i<exercises.length; i++){
      dietCaloriesIntake = dietCaloriesIntake + parseInt(exercises[i].calories_burned);
    }

    //calculate targeted calories
    var dayNutritionInfo = this.getDietDayDescription(date);
    var targetCaloriesFromProtein = dayNutritionInfo.daynutrition.protein/100*dietCaloriesIntake;
    var targetCaloriesFromCarbs = dayNutritionInfo.daynutrition.carbs/100*dietCaloriesIntake;
    var targetCaloriesFromFat = 5/100*dietCaloriesIntake;
    if( dayNutritionInfo.daynutrition.fat ){
      targetCaloriesFromFat = dayNutritionInfo.daynutrition.fat/100*dietCaloriesIntake;
    }

    //eating extra protein is ok
    if( caloriesConsumed>dietCaloriesIntake ){
      if( caloriesFromCarbs <= targetCaloriesFromCarbs && caloriesFromFat <= targetCaloriesFromFat ){
        eat_extra_protein = true;
      }
    }
    
    //we got the actual values for each, let just turn them into percentage
    if( meals.length > 0){
      let totalCaloriesFromFormula = caloriesFromProtein + caloriesFromCarbs + caloriesFromFat;
      caloriesFromProtein = Math.round(caloriesFromProtein*100/totalCaloriesFromFormula);
      caloriesFromCarbs = Math.round(caloriesFromCarbs*100/totalCaloriesFromFormula);
      caloriesFromFat = Math.round(caloriesFromFat*100/totalCaloriesFromFormula);
    }

    //if we devided by zero percentages are NaN, so lets reset them to zero
    if( !caloriesFromProtein ){
      caloriesFromProtein = 0;
    }
    if( !caloriesFromCarbs ){
      caloriesFromCarbs = 0;
    }
    if( !caloriesFromFat ){
      caloriesFromFat = 0;
    }


    var percent = caloriesConsumed*100/dietCaloriesIntake;

    var color = "green";
    if( percent> 100 ){
      color = "red";
    }

    if( eat_extra_protein ){
      color = "green";
    }

    return { 
      "caloriesConsumed":caloriesConsumed,
      "caloriesFromProtein": caloriesFromProtein,
      "caloriesFromCarbs":caloriesFromCarbs,
      "caloriesFromFat":caloriesFromFat,
      "dietCaloriesIntake":dietCaloriesIntake,
      "percent":percent,
      "color": color
     };
  }



}
