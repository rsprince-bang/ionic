import { Component, OnInit } from '@angular/core';
import { FoodSuggestionsService } from 'src/app/services/food-suggestions.service';
import { GlobalServicesService } from 'src/app/services/global-services.service';
import { ApiCallService } from 'src/app/services/api-call.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  dayNumber = null;
  date = null;
  previousDiets = [];
  startInfo = {date:"...", height:"...", weight:"..."};
  profileImageURL = "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y";

  constructor(private foodSuggestionsService: FoodSuggestionsService, private globalServices: GlobalServicesService, private myAPI: ApiCallService) { }

  ngOnInit() {
    this.date = this.globalServices.getTodayDate();
    this.dayNumber = this.foodSuggestionsService.getDietDayNumber(this.date);

    this.getProfileDetails();
  }

  getProfileDetails(){
    this.myAPI.makeAPIcall(
      "user_statistics.php",
      {
        "action": "getProfileDetails"
      },
      true
    ).subscribe((result) => {
      if (result.error) {
        this.myAPI.handleMyAPIError(result.error);
      }
      else {
        this.previousDiets = result.success.prev_diets;

        if( result.success.profile_image && result.success.profile_image.hasOwnProperty('url') ){
          this.profileImageURL = environment.API_URL + result.success.profile_image.url;
        }

        this.startInfo.date = result.success.start_date;
        this.startInfo.height = Math.floor(result.success.user_measurements.height_inches/12) + '\'' + result.success.user_measurements.height_inches%12 + '"';
        this.startInfo.weight = result.success.user_measurements.weight_lbs;

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
    // console.log("View old diet here");
    // console.log(from_date);
    // console.log(to_date);
  }

  uploadPicture($event): void {
    this.myAPI.uploadImageFromFile($event.target.files[0], null, null, null, "profile")
      .subscribe((result) => {
        if (result.error) {
          this.myAPI.handleMyAPIError(result.error);
        }
        else {
          this.profileImageURL = environment.API_URL + result.url;
        }
      });
  }



}
