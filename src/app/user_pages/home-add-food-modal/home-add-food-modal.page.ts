import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ApiCallService } from 'src/app/services/api-call.service';

@Component({
  selector: 'app-home-add-food-modal',
  templateUrl: './home-add-food-modal.page.html',
  styleUrls: ['./home-add-food-modal.page.scss'],
})
export class HomeAddFoodModalPage implements OnInit {

  searchResults = [];
  //results = null;
  searchTerm = '';
  constructor(private modalController: ModalController, private myAPI: ApiCallService) { }

  ngOnInit() {
  }

  searchChanged(){
    this.myAPI.makeAPIcall(
      "food_api.php", 
      {
        "action": "loadFoods",
        "food": this.searchTerm
      },
      true
    ).subscribe((result)=>{
      if( result.error ){
        this.myAPI.handleMyAPIError(result.error);
      }
      else{
        this.searchResults = result.success.foods;
      }
    });
  }

  clearSearch(){
    this.searchResults = [];
  }

  cancelModal(){
    this.modalController.dismiss();
  }

  showMoreInfo(item){
    if( item.hasOwnProperty('servings') ){
      //already expanded, collapse
      delete item.servings;
    }
    else{
      this.myAPI.makeAPIcall(
        "food_api.php", 
        {
          "action": "loadFoodById",
          "food_id": item.food_id
        },
        true
      ).subscribe((result)=>{
        if( result.error ){
          this.myAPI.handleMyAPIError(result.error);
        }
        else{
          //check for array
          if( result.success.food_details.hasOwnProperty('servings') ){
            if( result.success.food_details.servings.hasOwnProperty('serving') ){
              if( Array.isArray(result.success.food_details.servings.serving) ){
                item.servings = result.success.food_details.servings.serving;
              }
              else{
                item.servings = [result.success.food_details.servings.serving];
              }
            }
          }
          //or ony one serving resposne, fuck this api
          else if( result.success.food_details.hasOwnProperty('serving_description') ){
            //we will assume that it also has the other 3 properties
            item.servings = [result.success.food_detail];
          }
        }
      });
    }
  }

  addToList(item, calories, protein, fat, carbohydrate){

    console.log(calories);
    console.log(protein);
    console.log(fat);
    console.log(carbohydrate);
    console.log(item);

    //now save to DB
/*     this.myAPI.makeAPIcall(
      "food_api.php", 
      {
        "action": "loadFoodById",
        "food_id": item.food_id
      },
      true
    ).subscribe((result)=>{
      if( result.error ){
        this.myAPI.handleMyAPIError(result.error);
      }
      else{
        console.log(result);
        
      }
    }); */
    
    this.modalController.dismiss({ "item":item});
  }
}
