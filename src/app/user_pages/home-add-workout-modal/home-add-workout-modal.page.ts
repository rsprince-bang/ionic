import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiCallService } from 'src/app/services/api-call.service';
import { GlobalServicesService } from 'src/app/services/global-services.service';

@Component({
  selector: 'app-home-add-workout-modal',
  templateUrl: './home-add-workout-modal.page.html',
  styleUrls: ['./home-add-workout-modal.page.scss'],
})
export class HomeAddWorkoutModalPage implements OnInit {

  date; //passed from previous page
  searchResults = [];
  searchTerm = '';

  constructor(private modalController: ModalController, private myAPI: ApiCallService, private globalServices: GlobalServicesService) { }

  ngOnInit() {
  }

  searchExercises(){
    this.myAPI.makeAPIcall(
      //"exercises.php",
      "food_api_nutritionix.php",
      {
        "action": "loadExercises",
        "searchterm": this.searchTerm
      },
      true
    ).subscribe((result)=>{
      if( result.error ){
        this.modalController.dismiss();
        this.myAPI.handleMyAPIError(result.error);
      }
      else{
        this.searchResults = result.success.api_exercises;
      }
    });
  }

  clearSearch(){
    this.searchResults = [];
  }

  cancelModal(){
    this.modalController.dismiss();
  }

  selectExercise(item){
    if( item.selected ){
      item.selected = false;
    }
    else{
      item.selected = true;
    }
  }

  addExercise(exercises){
      this.myAPI.makeAPIcall(
        //"exercises.php",
        "food_api_nutritionix.php",
        {
          "action": "saveExercise",
          "exercises": exercises,
          "day": this.date
        },
        true
      ).subscribe((result)=>{
        this.modalController.dismiss(result);
      });
  }



}
