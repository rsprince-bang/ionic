import { Injectable } from '@angular/core';


export enum Phases {
  one = "I",  //30
  two = "II", //30
  three = "III" //24
}



@Injectable({
  providedIn: 'root'
})


export class FoodSuggestionsService {

  dietPlan = { w7:[], w12:[] }; //7 or 12 week
  phases = [];
  charts = [];

  // This constructor is for the old diet
  // constructor() {

  //   //define phase one days
  //   this.phases[Phases.one] = [];
  //   this.phases[Phases.one][1] = {
  //     "protein": 50, "carbs": 50,
  //     "meal1_suggestion": "M",
  //     "protein_suggestion": ["A", "D", "M", "N"],
  //     "carbs_suggestion": ["G"]
  //   };
  //   this.phases[Phases.one][2] = {
  //     "protein": 60, "fat": 30, "carbs": 10,
  //     "meal1_suggestion": "N",
  //     "protein_suggestion": ["A", "B", "C", "D", "E", "F", "N"],
  //     "carbs_suggestion": ["I"],
  //     "fat_suggestion": ["K", "L", "M", "N"]
  //   };
  //   this.phases[Phases.one][3] = {
  //     "protein": 60, "fat": 30, "carbs": 10,
  //     "meal1_suggestion": "N",
  //     "protein_suggestion": ["A", "B", "C", "D", "E", "F", "N"],
  //     "carbs_suggestion": ["I"],
  //     "fat_suggestion": ["K", "L", "M", "N"]
  //   };

  //   //define phase two days
  //   this.phases[Phases.two] = [];
  //   this.phases[Phases.two][1] = {
  //     "protein": 50, "carbs": 50,
  //     "meal1_suggestion": "M",
  //     "protein_suggestion": ["A", "D", "M", "N"],
  //     "carbs_suggestion": ["G"]
  //   };
  //   this.phases[Phases.two][2] = {
  //     "protein": 60, "fat": 30, "carbs": 10,
  //     "meal1_suggestion": "N",
  //     "protein_suggestion": ["A", "B", "C", "D", "E", "F", "N"],
  //     "carbs_suggestion": ["I"],
  //     "fat_suggestion": ["K", "L", "M", "N"]
  //   };

  //   //define phase three days
  //   this.phases[Phases.three] = [];
  //   this.phases[Phases.three][1] = {
  //     "protein": 50, "carbs": 30, "fat": 20,
  //     "meal1_suggestion": "M",
  //     "protein_suggestion": ["A", "B", "C", "D", "E", "F", "M", "N"],
  //     "carbs_suggestion": ["G"],
  //     "fat_suggestion": ["K", "L", "M", "N"]
  //   };


  //   //declare charts
  //   this.charts["A"] = ["Albacore Tuna", "Soft-Shell Crab", "Cod", "Crayfish", "Dungeness Crab", "Flounder", "Fresh Tuna Steak", "Grouper", "Haddock",
  //     "Halibut", "King Crab", "Lobster", "Mahi Mahi", "Monkfish", "Ocean Perch", "Orange Roughy", "Scallops", "Sea Bass", "Shrimp", "Snapper", "Sole"];

  //   this.charts["B"] = ["Blue Fish", "Catfish", "Herring", "King Salmon", "Mackerel", "Pompano", "Rainbow Trout", "Sea Trout", "Silver (Pink) Salmon",
  //     "Sockeye Salmon", "Striped Bass", "Sturgeon", "Swordfish", "Whitefish", "Yellowtail"];

  //   this.charts["C"] = ["Blue Fish", "Catfish", "Herring", "King Salmon", "Mackerel", "Pompano", "Rainbow Trout", "Sea Trout", "Silver (Pink) Salmon",
  //     "Sockeye Salmon", "Striped Bass", "Sturgeon", "Swordfish", "Whitefish", "Yellowtail"];

  //   this.charts["D"] = ["Chicken Breast", "Low Fat Cottage Cheese", "Nonfat Cottage Cheese", "Turkey Breast", "Egg Whites"];

  //   this.charts["E"] = ["XL Whole Eggs", "XL Egg Yolks"];

  //   this.charts["F"] = ["Beef Eye Round", "Flat Iron Steak", "Filet Mignon", "Pork Top Loin", "Pork Tenderloin", "Veal Shank"];

  //   this.charts["G"] = ["Barley", "Black Beans (Dry)", "Brown Rice (Dry)", "Buckweat", "Couscous (Dry)", "Kidney Beans (Dry)", "Oatmeal (Dry)", "Multi-grain Oatmeal",
  //     "Rye", "Wheat Germ", "Wild Rice", "Yam", "Sweet Potato", "Whole Wheat Bread", "Multi-grain Bread"];

  //   this.charts["H"] = ["Oatmeal Pancakes", "Sweet Potato Pancakes"];

  //   this.charts["I"] = ["Alfalfa Sprouts", "Artichokes", "Asparagus", "Bell Pepper", "Broccoli", "Cabbage", "Cauliflower", "Celery", "Chicory", "Chives", "Cilantro",
  //     "Collards", "Cucumber", "Endive", "Fennel", "Garlic", "Green Beans", "Onion", "Kale", "Leeks", "Lettuce", "Mushrooms", "Mustard greens", "Okra", "Parsley",
  //     "Radish", "Sauerkraut", "Spinach", "Sugar Snap Peas", "Sweet Potato", "Turnip", "Watercress", "Yam", "Yellow Squash"];

  //   this.charts["J"] = ["Apple", "Cranberries", "Kiwi", "Lemon", "Lime", "Peach", "Plum", "Raspberries", "Strawberries"];

  //   this.charts["K"] = ["Avocado", "Black Olives", "Green Olives"];

  //   this.charts["L"] = ["Almonds", "Brazil Nuts", "Hazelnuts, Roasted", "Peanuts, Roasted", "Pecans", "Pine Nuts", "Walnuts"];

  //   this.charts["M"] = ["Zero Impact"];

  //   this.charts["N"] = ["NO Shotgun", "Redline Liquid Caps", "Redline Drink", "Zero Carb", "Zero Impact"];

  // }


  //This constructyor is for new diet as of Dec 17 2019
  constructor() {

    //12 week plan
    //define phase one days
    this.dietPlan.w12[Phases.one] = { name:"Fuel Shifting - 28 days", days:[] };
    this.dietPlan.w12[Phases.one].days[1] = {
      "protein": 60, "carbs": 19, "fat": 21
    };
    this.dietPlan.w12[Phases.one].days[2] = {
      "protein": 60, "carbs": 19, "fat": 21
    };
    this.dietPlan.w12[Phases.one].days[3] = {
      "protein": 50, "carbs": 40, "fat": 10
    };
    this.dietPlan.w12[Phases.one].days[4] = {
      "protein": 60, "carbs": 19, "fat": 21
    };
    this.dietPlan.w12[Phases.one].days[5] = {
      "protein": 60, "carbs": 19, "fat": 21
    };
    this.dietPlan.w12[Phases.one].days[6] = {
      "protein": 50, "carbs": 40, "fat": 10
    };
    this.dietPlan.w12[Phases.one].days[7] = {
      "protein": 40, "carbs": 40, "fat": 20
    };

    //define phase two days
    this.dietPlan.w12[Phases.two] = { name:"Calorie Shift Metabolic Kick - 28 days", days:[] };
    this.dietPlan.w12[Phases.two].days[1] = {
      "protein": 60, "carbs": 19, "fat": 21
    };
    this.dietPlan.w12[Phases.two].days[2] = {
      "protein": 50, "carbs": 40, "fat": 10
    };
    this.dietPlan.w12[Phases.two].days[3] = {
      "protein": 60, "carbs": 19, "fat": 21
    };
    this.dietPlan.w12[Phases.two].days[4] = {
      "protein": 50, "carbs": 40, "fat": 10
    };
    this.dietPlan.w12[Phases.two].days[5] = {
      "protein": 60, "carbs": 19, "fat": 21
    };
    this.dietPlan.w12[Phases.two].days[6] = {
      "protein": 50, "carbs": 40, "fat": 10
    };
    this.dietPlan.w12[Phases.two].days[7] = {
      "protein": 40, "carbs": 40, "fat": 20
    };

    //define phase three days
    this.dietPlan.w12[Phases.three] = { name:"The Rapid Body Remodeling Bang Anti-Diet Lifestyle - 28 days", days:[] };
    this.dietPlan.w12[Phases.three].days[1] = { //day one repets all week
      "protein": 60, "carbs": 20, "fat": 20
    };
    //end 12 week plan

    //7 week plan
    //define phase one days
    this.dietPlan.w7[Phases.one] = { name:"Fuel Shifting - 28 days", days:[] };
    this.dietPlan.w7[Phases.one].days[1] = {
      "protein": 60, "carbs": 19, "fat": 21
    };
    this.dietPlan.w7[Phases.one].days[2] = {
      "protein": 60, "carbs": 19, "fat": 21
    };
    this.dietPlan.w7[Phases.one].days[3] = {
      "protein": 50, "carbs": 40, "fat": 10
    };
    this.dietPlan.w7[Phases.one].days[4] = {
      "protein": 60, "carbs": 19, "fat": 21
    };
    this.dietPlan.w7[Phases.one].days[5] = {
      "protein": 60, "carbs": 19, "fat": 21
    };
    this.dietPlan.w7[Phases.one].days[6] = {
      "protein": 50, "carbs": 40, "fat": 10
    };
    this.dietPlan.w7[Phases.one].days[7] = {
      "protein": 40, "carbs": 40, "fat": 20
    };

    //define phase two days
    this.dietPlan.w7[Phases.two] = { name:"Calorie Shift Ketone Kick - 21 days", days:[] };
    this.dietPlan.w7[Phases.two].days[1] = {
      "protein": 59, "carbs": 19.5, "fat": 21.5
    };
    this.dietPlan.w7[Phases.two].days[2] = {
      "protein": 37, "carbs": 55, "fat": 8
    };
    this.dietPlan.w7[Phases.two].days[3] = {
      "protein": 59, "carbs": 19.5, "fat": 21.5
    };
    this.dietPlan.w7[Phases.two].days[4] = {
      "protein": 37, "carbs": 55, "fat": 8
    };
    this.dietPlan.w7[Phases.two].days[5] = {
      "protein": 59, "carbs": 19.5, "fat": 21.5
    };
    this.dietPlan.w7[Phases.two].days[6] = {
      "protein": 37, "carbs": 55, "fat": 8
    };
    this.dietPlan.w7[Phases.two].days[7] = {
      "protein": 40, "carbs": 40, "fat": 20
    };
    //end 7 week plan

    //declare charts
    //dont have charts for new diet

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

  getDietDayDescription(date, plan_length) { //plan_length is ineger weeks
    //date = "2020-02-17";

    let daynumber = this.getDietDayNumber(date);
    let phase = "";
    let phaseday = null;

    //calc day for 12 week plan
    if( plan_length == 12 ){ 
      if (daynumber >= 1 && daynumber <= 28) {
        phase = Phases.one;
        phaseday = daynumber % 7; //because 7 days in phase one
        if (phaseday == 0) {
          phaseday = 7;
        }
      }
      else if (daynumber >= 29 && daynumber <= 56) {
        phase = Phases.two;
        phaseday = daynumber % 7; //7 days in phase two
        if (phaseday == 0) {
          phaseday = 7;
        }
      }
      else {
        phase = Phases.three;
        phaseday = 1; //it always day one in phase three
      }
    }
    //calc day for 7 week plan
    else{
      //plan_length == 7
      if (daynumber >= 1 && daynumber <= 28) {
        phase = Phases.one;
        phaseday = daynumber % 7; //because 7 days in phase one
        if (phaseday == 0) {
          phaseday = 7;
        }
      }
      else{
        phase = Phases.two;
        phaseday = daynumber % 7; //7 days in phase two
        if (phaseday == 0) {
          phaseday = 7;
        }
      }
    }
    var plan = "w"+plan_length;

    return { "phase": phase, "phaseday": phaseday, "phasename": this.dietPlan[plan][phase].name, "daynutrition": this.dietPlan[plan][phase].days[phaseday] };
  }


  getCaloriesPercentages(date, meals, exercises, plan_length) {
    var caloriesConsumed = 0;
    var caloriesFromProtein = 0;
    var caloriesFromCarbs = 0;
    var caloriesFromFat = 0;

    var targetCaloriesFromProtein = 0;
    var targetCaloriesFromCarbs = 0;
    var targetCaloriesFromFat = 0;

    var caloriesFromProteinAsP = 0;
    var caloriesFromCarbsAsP = 0;
    var caloriesFromFatAsP = 0;

    var dietCaloriesIntake = parseInt(localStorage.getItem('currentCaloriesIntake'));
    var eat_extra_protein = false;
    var dayNutritionInfo = this.getDietDayDescription(date, plan_length);

    for (let i = 0; i < meals.length; i++) {
      caloriesConsumed = caloriesConsumed + parseInt(meals[i].calories);

      caloriesFromProtein = caloriesFromProtein + (meals[i].protein * 4);
      caloriesFromCarbs = caloriesFromCarbs + (meals[i].carbs * 4);
      caloriesFromFat = caloriesFromFat + (meals[i].fat * 9);
    }

    //calculate targeted calories
    targetCaloriesFromProtein = dayNutritionInfo.daynutrition.protein / 100 * dietCaloriesIntake;
    targetCaloriesFromCarbs = dayNutritionInfo.daynutrition.carbs / 100 * dietCaloriesIntake;
    targetCaloriesFromFat = 5 / 100 * dietCaloriesIntake;
    if (dayNutritionInfo.daynutrition.fat) {
      targetCaloriesFromFat = dayNutritionInfo.daynutrition.fat / 100 * dietCaloriesIntake;
    }

    //eating extra protein is ok
    if (caloriesConsumed > dietCaloriesIntake) {
      if (caloriesFromCarbs <= targetCaloriesFromCarbs && caloriesFromFat <= targetCaloriesFromFat) {
        eat_extra_protein = true;
      }
    }

    //we got the actual values for each, let just turn them into percentage
    if (meals.length > 0) {
      let totalCaloriesFromFormula = caloriesFromProtein + caloriesFromCarbs + caloriesFromFat;
      caloriesFromProteinAsP = Math.round(caloriesFromProtein * 100 / totalCaloriesFromFormula);
      caloriesFromCarbsAsP = Math.round(caloriesFromCarbs * 100 / totalCaloriesFromFormula);
      caloriesFromFatAsP = Math.round(caloriesFromFat * 100 / totalCaloriesFromFormula);
    }

    //if we devided by zero percentages are NaN, so lets reset them to zero
    if (!caloriesFromProtein) {
      caloriesFromProtein = 0;
    }
    if (!caloriesFromCarbs) {
      caloriesFromCarbs = 0;
    }
    if (!caloriesFromFat) {
      caloriesFromFat = 0;
    }


    var percent = caloriesConsumed * 100 / dietCaloriesIntake;

    var color = "green";
    if (percent > 100) {
      color = "red";
    }

    if (eat_extra_protein) {
      color = "green";
    }

    return {
      "caloriesFromProtein": caloriesFromProtein,
      "caloriesFromCarbs": caloriesFromCarbs,
      "caloriesFromFat": caloriesFromFat,

      "targetCaloriesFromProtein": targetCaloriesFromProtein,
      "targetCaloriesFromCarbs": targetCaloriesFromCarbs,
      "targetCaloriesFromFat": targetCaloriesFromFat,

      "caloriesConsumed": caloriesConsumed,

      "caloriesFromProteinAsP": caloriesFromProteinAsP,
      "caloriesFromCarbsAsP": caloriesFromCarbsAsP,
      "caloriesFromFatAsP": caloriesFromFatAsP,

      "dietCaloriesIntake": dietCaloriesIntake,
      "percent": percent,
      "color": color
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

  getFoodSuggestions(date, plan_length) {
    var suggestedFoods = [];
    suggestedFoods["mealOne"] = null;
    suggestedFoods["proteinMeals"] = [];
    suggestedFoods["carbMeals"] = [];
    suggestedFoods["fatMeals"] = [];

    var dayDescription = this.getDietDayDescription(date, plan_length);

    //get random meal1
    if (dayDescription.daynutrition.hasOwnProperty("meal1_suggestion")) {
      var suggestionsArray = this.charts[dayDescription.daynutrition.meal1_suggestion];
      suggestedFoods["mealOne"] = suggestionsArray[Math.floor(Math.random() * suggestionsArray.length)];
    }

    //get random protein meals
    if (dayDescription.daynutrition.hasOwnProperty("protein_suggestion")) {
      dayDescription.daynutrition.protein_suggestion.forEach(chartletter => {
        suggestedFoods["proteinMeals"] = suggestedFoods["proteinMeals"].concat(this.charts[chartletter]);
      });
      suggestedFoods["proteinMeals"] = Array.from(new Set(suggestedFoods["proteinMeals"])); //make it unique
      suggestedFoods["proteinMeals"] = suggestedFoods["proteinMeals"][Math.floor(Math.random() * suggestedFoods["proteinMeals"].length)]; //limit to 1
    }
    //get random carb meals
    if (dayDescription.daynutrition.hasOwnProperty("carbs_suggestion")) {
      dayDescription.daynutrition.carbs_suggestion.forEach(chartletter => {
        suggestedFoods["carbMeals"] = suggestedFoods["carbMeals"].concat(this.charts[chartletter]);
      });
      suggestedFoods["carbMeals"] = Array.from(new Set(suggestedFoods["carbMeals"])); //make it unique
      suggestedFoods["carbMeals"] = suggestedFoods["carbMeals"][Math.floor(Math.random() * suggestedFoods["carbMeals"].length)]; //limit to 1
    }
    //get random fat meals
    if (dayDescription.daynutrition.hasOwnProperty("fat_suggestion")) {
      dayDescription.daynutrition.fat_suggestion.forEach(chartletter => {
        suggestedFoods["fatMeals"] = suggestedFoods["fatMeals"].concat(this.charts[chartletter]);
      });
      suggestedFoods["fatMeals"] = Array.from(new Set(suggestedFoods["fatMeals"])); //make it unique
      suggestedFoods["fatMeals"] = suggestedFoods["fatMeals"][Math.floor(Math.random() * suggestedFoods["fatMeals"].length)]; //limit to 1
    }

    return {
      "mealOne":suggestedFoods["mealOne"],
      "proteinMeals":suggestedFoods["proteinMeals"],
      "carbMeals":suggestedFoods["carbMeals"],
      "fatMeals":suggestedFoods["fatMeals"]
    }
  }



}
