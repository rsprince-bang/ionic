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

    var diffTime = Math.abs(dateRegistered.getTime() - dateRequested.getTime());
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
}
