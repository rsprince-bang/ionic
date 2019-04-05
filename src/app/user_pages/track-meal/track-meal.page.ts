import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalServicesService } from 'src/app/services/global-services.service';

@Component({
  selector: 'app-track-meal',
  templateUrl: './track-meal.page.html',
  styleUrls: ['./track-meal.page.scss'],
})
export class TrackMealPage implements OnInit {

  day = null;
  disablechecksmarks = false;
  results: Observable<any>;
  searchTerm = '';
  randomMeals = [
    { name: 'Eggs', isChecked: true },
    { name: 'Turkey Sandwich', isChecked: false },
    { name: 'Salmon', isChecked: true },
    { name: 'Pork Chops', isChecked: true },
    { name: 'Ribeye Steak', isChecked: false },
    { name: 'Grilled Chicken', isChecked: true },
    { name: 'Canolli', isChecked: true },
    { name: 'Pizza', isChecked: false },
    { name: 'Ice Cream', isChecked: false },
  ];
  todaymeals = [];

  constructor( private alertCtrl: AlertController, private router: Router,
    private globalServices: GlobalServicesService, private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {

    this.day = this.activatedRoute.snapshot.paramMap.get('day');

    //get 2 random meals for testing stackoverflow func
    this.todaymeals = this.randomMeals.sort(() => .5 - Math.random()).slice(0,2);

    //default day is 5 , i.e. 5 == today
    //if anyuthing before that will be checked and disabled; anything after will be unchecked
    for( var i = 0; i<this.todaymeals.length; i++){
      if( this.day < 5 ){
        this.todaymeals[i].isChecked = true;
        this.disablechecksmarks = true;
      }
      else if( this.day > 5 ){
        this.todaymeals[i].isChecked = false;
      }
    }
  }


  searchChanged(){
    //this.results = this.movieService.searchData(this.searchTerm, this.type);
  }


  addToList(title){
    this.todaymeals.push({"name": title, "isChecked": true});
    this.searchTerm = '';
  }


  removeFromList(item){
    this.todaymeals = this.todaymeals.filter( el => el.name != item.name );
  }


  editMeal(){
    this.alertCtrl.create({
      header: "Header",
      subHeader: "Subheader",
      message: "Edit Meal",
      buttons: ['Ok']
    }).then(alert => alert.present());
  }

  handleSwipeLeft() {
    var nextday = parseInt(this.day)+1;
    this.globalServices.swipeLeft("/track-meal/"+nextday);
  }

  handleSwipeRight() {
    if( this.day > 1 ){
      var prevday = parseInt(this.day)-1;
      this.globalServices.swipeRight("/track-meal/"+prevday);
    }
  }


  press(){
    console.log("press");
  }



}
