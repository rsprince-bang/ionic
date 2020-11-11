import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})


export class FoodSuggestionsService {

  dietPlan = { 
    loose:{ days:[] }, 
    gain:{ days:[]} }; 


  //This constructyor is for new diet as of Dec 17 2019
  constructor() {

    //loose weight plan

    //those are percentages
    this.dietPlan.loose.days[1] = {
      "protein": 59, "carbs": 19.5, "fat": 21.5,
      "calorie_deficit": -25
    };
    this.dietPlan.loose.days[2] = {
      "protein": 59, "carbs": 19.5, "fat": 21.5,
      "calorie_deficit": -25 //should eat 25% less calories
    };
    this.dietPlan.loose.days[3] = {
      "protein": 50, "carbs": 40, "fat": 10,
      "calorie_deficit": null //should maintain the caloies required by BMR
    };
    this.dietPlan.loose.days[4] = {
      "protein": 59, "carbs": 19.5, "fat": 21.5,
      "calorie_deficit": -25
    };
    this.dietPlan.loose.days[5] = {
      "protein": 59, "carbs": 19.5, "fat": 21.5,
      "calorie_deficit": -25
    };
    this.dietPlan.loose.days[6] = {
      "protein": 50, "carbs": 40, "fat": 10,
      "calorie_deficit": null
    };
    this.dietPlan.loose.days[7] = {
      "protein": 40, "carbs": 40, "fat": 20,
      "calorie_deficit": -25
    };
    //end loose weight plan

    //gain weight plan
    this.dietPlan.gain.days[1] = {
      "protein": 40, "carbs": 40, "fat": 20,
      "calorie_deficit": null
    };
    //end gain weight plan
  }

  getDietDayNumber(date) {

    var dateRegistered = new Date(JSON.parse(localStorage.getItem('diet_start_date')));
    var dateRequested = new Date(date);

    var diffTime = (dateRequested.getTime() - dateRegistered.getTime());
    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays + 1; //cuz if resitered today its day 1 not day zero
  }

  getDietPlanWeeks(){
    var weeks = localStorage.getItem('diet_plan_length');

    return parseInt(weeks);
  }

  getDietDayDescription(date) { //plan_length is integer weeks, 7 or 12
    //date = "2020-02-17";

    let daynumber = this.getDietDayNumber(date);
    let phaseday = null;
    
    var goals = JSON.parse(localStorage.getItem("goals"));
    if( goals && goals.hasOwnProperty('pounds_to_loose') ){
      phaseday = daynumber % 7; //7 days in phase two
      if (phaseday == 0) {
        phaseday = 7;
      }

      return { "daynumber":daynumber, "phaseday": phaseday, "daynutrition": this.dietPlan.loose.days[phaseday] };
    }
    else if( goals && goals.hasOwnProperty('pounds_to_gain') ){
      phaseday = 1; //it always day one in gain weight plan

      return { "daynumber":daynumber, "phaseday": phaseday, "daynutrition": this.dietPlan.gain.days[phaseday] };
    }

  }


  getCalorieGrams(date, meals, plan_length) {

    var caloriesConsumed = 0;
    var gramsProteinConsumed = 0;
    var gramsCarbsConsumed = 0;
    var gramsFatConsumed = 0;

    var dietCaloriesIntake = parseInt(localStorage.getItem('currentCaloriesIntake'));
    var dayNutritionInfo = this.getDietDayDescription(date);

    for (let i = 0; i < meals.length; i++) {
      caloriesConsumed = caloriesConsumed + parseInt(meals[i].calories);

      gramsProteinConsumed = gramsProteinConsumed + (meals[i].protein);
      gramsCarbsConsumed = gramsCarbsConsumed + (meals[i].carbs);
      gramsFatConsumed = gramsFatConsumed + (meals[i].fat);
    }

    //calculate targeted calories
    var targetCaloriesFromProtein = dayNutritionInfo.daynutrition.protein / 100 * dietCaloriesIntake;
    var targetProtein = targetCaloriesFromProtein / 4; //4 calories in gram of protein

    var targetCaloriesFromCarbs = dayNutritionInfo.daynutrition.carbs / 100 * dietCaloriesIntake;
    var targetCarbs = targetCaloriesFromCarbs / 4;

    var targetCaloriesFromFat = 5 / 100 * dietCaloriesIntake;
    if (dayNutritionInfo.daynutrition.fat) {
      targetCaloriesFromFat = dayNutritionInfo.daynutrition.fat / 100 * dietCaloriesIntake;
    }
    var targetFat = targetCaloriesFromFat / 9;

    var percent = caloriesConsumed * 100 / dietCaloriesIntake;

    return {
      "gramsProteinConsumed": gramsProteinConsumed,
      "gramsCarbsConsumed": gramsCarbsConsumed,
      "gramsFatConsumed": gramsFatConsumed,

      "targetProtein": targetProtein,
      "targetCarbs": targetCarbs,
      "targetFat": targetFat,

      "caloriesConsumed": caloriesConsumed,
      "dietCaloriesIntake": dietCaloriesIntake,
      "percent": percent,
    };
  }

  getWorkoutStatus(exercises) {
    if (exercises.length > 0) {
      //at elast 20 minutes of exersice
      var hoursOfExercise = 0;
      for (var i = 0; i < exercises.length; i++) {
        hoursOfExercise = (hoursOfExercise) + parseFloat(exercises[i].hours);
      }
      if (hoursOfExercise > 0.3) {
        return true;
      }
    }
    else {
      return false;
    }
  }

  getScore(caloriesEat, targetCalories, didExercise, color, percent) {
    var baseScore = 100;

    if (color == "green") {
      if (caloriesEat > targetCalories) {
        //overeat with protein only wich is ok
      }
      else {
        //met calories count or undereat
        var underEatByP = 100 - Math.round(percent);
        if (underEatByP > 10) {
          baseScore = baseScore + 10;
        }
        else {
          baseScore = baseScore + underEatByP;
        }
      }
    }
    else {
      //red, overeat
      var overEatByP = Math.round(percent) - 100;
      baseScore = baseScore - (overEatByP * 0.75);
    }

    if (!didExercise) {
      baseScore = baseScore - 15;
    }

    //no food info, i.e. yesterday
    if (caloriesEat == 0) {
      baseScore = 0;
    }

    //check for negatives if you way overeat
    if (baseScore < 0) {
      baseScore = 1;
    }

    return baseScore;
  }


}
