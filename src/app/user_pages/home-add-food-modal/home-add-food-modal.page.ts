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

  addToList(title){
    this.modalController.dismiss({ "title":title});
  }
}
