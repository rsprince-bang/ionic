import { Component, OnInit } from '@angular/core';
import { FoodSuggestionsService } from 'src/app/services/food-suggestions.service';
import { GlobalServicesService } from 'src/app/services/global-services.service';
import { ApiCallService } from 'src/app/services/api-call.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  dayNumber = null;
  date = null;
  previousDiets = [];

  constructor(private foodSuggestionsService: FoodSuggestionsService, private globalServices: GlobalServicesService, private myAPI: ApiCallService) { }

  ngOnInit() {
    this.date = this.globalServices.getTodayDate();
    this.dayNumber = this.foodSuggestionsService.getDietDayNumber(this.date);

    this.getPreviousDiets();
  }

  getPreviousDiets(){
    this.myAPI.makeAPIcall(
      "user_statistics.php",
      {
        "action": "getPreviousDiets"
      },
      true
    ).subscribe((result) => {
      if (result.error) {
        this.myAPI.handleMyAPIError(result.error);
      }
      else {
        this.previousDiets = result.success.prev_diets;
      }
    });
  }

  resetDiet(){
    this.myAPI.makeAPIcall(
      "users.php",
      {
        "action": "resetDiet",
        "today_date": this.date,
        "yesterday_date": this.globalServices.getPreviousDate(this.date)
      },
      true
    ).subscribe((result) => {
      if (result.error) {
        this.myAPI.handleMyAPIError(result.error);
      }
      else {
        localStorage.setItem('diet_start_date', JSON.stringify(result.success.diet_start_date));
        this.ngOnInit();
      }
    });
  }

  viewOldDiet(from_date, to_date){
    console.log("View old diet here");
    console.log(from_date);
    console.log(to_date);
  }

}
