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

  phases = [];
  charts = [];

  constructor() {

    //define phase one days
    this.phases[Phases.one] = [];
    this.phases[Phases.one][1] = {
      "protein": 50, "carbs": 50,
      "meal1_suggestion": "M",
      "protein_suggestion": ["A", "D", "M", "N"],
      "carbs_suggestion": ["G"]
    };
    this.phases[Phases.one][2] = {
      "protein": 60, "fat": 30, "carbs": 10,
      "meal1_suggestion": "N",
      "protein_suggestion": ["A", "B", "C", "D", "E", "F", "N"],
      "carbs_suggestion": ["I"],
      "fat_suggestion": ["K", "L", "M", "N"]
    };
    this.phases[Phases.one][3] = {
      "protein": 60, "fat": 30, "carbs": 10,
      "meal1_suggestion": "N",
      "protein_suggestion": ["A", "B", "C", "D", "E", "F", "N"],
      "carbs_suggestion": ["I"],
      "fat_suggestion": ["K", "L", "M", "N"]
    };

    //define phase two days
    this.phases[Phases.two] = [];
    this.phases[Phases.two][1] = {
      "protein": 50, "carbs": 50,
      "meal1_suggestion": "M",
      "protein_suggestion": ["A", "D", "M", "N"],
      "carbs_suggestion": ["G"]
    };
    this.phases[Phases.two][2] = {
      "protein": 60, "fat": 30, "carbs": 10,
      "meal1_suggestion": "N",
      "protein_suggestion": ["A", "B", "C", "D", "E", "F", "N"],
      "carbs_suggestion": ["I"],
      "fat_suggestion": ["K", "L", "M", "N"]
    };

    //define phase three days
    this.phases[Phases.three] = [];
    this.phases[Phases.three][1] = {
      "protein": 50, "carbs": 30, "fat": 20,
      "meal1_suggestion": "M",
      "protein_suggestion": ["A", "B", "C", "D", "E", "F", "M", "N"],
      "carbs_suggestion": ["G"],
      "fat_suggestion": ["K", "L", "M", "N"]
    };


    //declare charts
    this.charts["A"] = ["Albacore Tuna", "Soft-Shell Crab", "Cod", "Crayfish", "Dungeness Crab", "Flounder", "Fresh Tuna Steak", "Grouper", "Haddock",
      "Halibut", "King Crab", "Lobster", "Mahi Mahi", "MOnkfish", "Ocean Perch", "Orange Roughy", "Scallops", "Sea Bass", "Shrimp", "Snapper", "Sole"];

    this.charts["B"] = ["Blue Fish", "Catfish", "Herring", "King Salmon", "Mackerel", "Pompano", "Rainbow Trout", "Sea Trout", "Silver (Pink) Salmon",
      "Sockeye Salmon", "Striped Bass", "Sturgeon", "Swordfish", "Whitefish", "Yellowtail"];

    this.charts["C"] = ["Blue Fish", "Catfish", "Herring", "King Salmon", "Mackerel", "Pompano", "Rainbow Trout", "Sea Trout", "Silver (Pink) Salmon",
      "Sockeye Salmon", "Striped Bass", "Sturgeon", "Swordfish", "Whitefish", "Yellowtail"];

    this.charts["D"] = ["Chicken Breast", "Low Fat Cottage Cheese", "Nonfat Cottage Cheese", "Turkey Breast", "Egg Whites"];

    this.charts["E"] = ["XL Whole Eggs", "XL Egg Yolks"];

    this.charts["F"] = ["Beef Eye Round", "Flat Iron Steak", "Filet Mignon", "Pork Top Loin", "Pork Tenderloin", "Veal Shank"];

    this.charts["G"] = ["Barley", "Black Beans (Dry)", "Brown Rice (Dry)", "Buckweat", "Couscous (Dry)", "Kidney Beans (Dry)", "Oatmeal (Dry)", "Multi-grain Oatmeal",
      "Rye", "Wheat Germ", "Wild Rice", "Yam", "Sweet Potato", "Whole Wheat Bread", "Multi-grain Bread"];

    this.charts["H"] = ["Oatmeal Pancakes", "Sweet Potato Pancakes"];

    this.charts["I"] = ["Alfalfa Sprouts", "Artichokes", "Asparagus", "Bell Pepper", "Broccoli", "Cabbage", "Cauliflower", "Celery", "Chicory", "Chives", "Cilantro",
      "Collards", "Cucumber", "Endive", "Fennel", "Garlic", "Green Beans", "Onion", "Kale", "Leeks", "Lettuce", "Mushrooms", "Mustard greens", "Okra", "Parsley",
      "Radish", "Sauerkraut", "Spinach", "Sugar Snap Peas", "Sweet Potato", "Turnip", "Watercress", "Yam", "Yellow Squash"];

    this.charts["J"] = ["Apple", "Cranberries", "Kiwi", "Lemon", "Lime", "Peach", "Plum", "Raspberries", "Strawberries"];

    this.charts["K"] = ["Avocado", "Black Olives", "Green Olives"];

    this.charts["L"] = ["Almonds", "Brazil Nuts", "Hazelnuts, Roasted", "Peanuts, Roasted", "Pecans", "Pine Nuts", "Walnuts"];

    this.charts["M"] = ["Zero Impact Protein Bar"];

    this.charts["N"] = ["NO Shotgun", "Redline Liquid Caps", "Redline Drink", "Zero Carb Protein", "Zero Impact Protein"];

  }




  getDietDayNumber(date) {

    var dateRegistered = new Date(JSON.parse(localStorage.getItem('diet_start_date')));
    var dateRequested = new Date(date);

    var diffTime = (dateRequested.getTime() - dateRegistered.getTime());
    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays + 1; //cuz if resitered today its day 1 not day zero
  }

  getDietDayDescription(date) {
    //date = "2019-04-13";
    let daynumber = this.getDietDayNumber(date);
    let phase = "";
    let phaseday = null;

    if (daynumber >= 1 && daynumber <= 30) {
      phase = Phases.one;
      phaseday = daynumber % 3; //because 3 days in phase one
      if (phaseday == 0) {
        phaseday = 3;
      }
    }
    else if (daynumber >= 31 && daynumber <= 60) {
      phase = Phases.two;
      phaseday = daynumber % 2; //2 days in phase two
      if (phaseday == 0) {
        phaseday = 2;
      }
    }
    else {
      phase = Phases.three;
      phaseday = 1; //it always day one in phase three
    }

    return { "phase": phase, "phaseday": phaseday, "daynutrition": this.phases[phase][phaseday] };
  }


  getCaloriesPercentages(date, meals, exercises) {
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

    var dietCaloriesIntake = parseInt(localStorage.getItem('dailyCaloriesIntake')) - 200;
    var eat_extra_protein = false;

    for (let i = 0; i < meals.length; i++) {
      caloriesConsumed = caloriesConsumed + parseInt(meals[i].calories);

      caloriesFromProtein = caloriesFromProtein + (meals[i].protein * 4);
      caloriesFromCarbs = caloriesFromCarbs + (meals[i].carbs * 4);
      caloriesFromFat = caloriesFromFat + (meals[i].fat * 9);
    }

    //if they worked out they can eat more calories
    for (let i = 0; i < exercises.length; i++) {
      dietCaloriesIntake = dietCaloriesIntake + parseInt(exercises[i].calories_burned);
    }

    //calculate targeted calories
    var dayNutritionInfo = this.getDietDayDescription(date);
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

  getFoodSuggestions(date) {
    var suggestedFoods = [];
    suggestedFoods["mealOne"] = null;
    suggestedFoods["proteinMeals"] = [];
    suggestedFoods["carbMeals"] = [];
    suggestedFoods["fatMeals"] = [];

    var dayDescription = this.getDietDayDescription(date);

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
