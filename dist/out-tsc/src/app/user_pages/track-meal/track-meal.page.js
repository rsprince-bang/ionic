import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { SearchType, MovieService } from 'src/app/services/movies.service';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalServicesService } from 'src/app/services/global-services.service';
var TrackMealPage = /** @class */ (function () {
    function TrackMealPage(movieService, alertCtrl, router, globalServices, activatedRoute) {
        this.movieService = movieService;
        this.alertCtrl = alertCtrl;
        this.router = router;
        this.globalServices = globalServices;
        this.activatedRoute = activatedRoute;
        this.day = null;
        this.disablechecksmarks = false;
        this.searchTerm = '';
        this.type = SearchType.all;
        this.randomMeals = [
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
        this.todaymeals = [];
    }
    TrackMealPage.prototype.ngOnInit = function () {
        this.day = this.activatedRoute.snapshot.paramMap.get('day');
        //get 2 random meals for testing stackoverflow func
        this.todaymeals = this.randomMeals.sort(function () { return .5 - Math.random(); }).slice(0, 2);
        //default day is 5 , i.e. 5 == today
        //if anyuthing before that will be checked and disabled; anything after will be unchecked
        for (var i = 0; i < this.todaymeals.length; i++) {
            if (this.day < 5) {
                this.todaymeals[i].isChecked = true;
                this.disablechecksmarks = true;
            }
            else if (this.day > 5) {
                this.todaymeals[i].isChecked = false;
            }
        }
    };
    TrackMealPage.prototype.searchChanged = function () {
        this.results = this.movieService.searchData(this.searchTerm, this.type);
    };
    TrackMealPage.prototype.addToList = function (title) {
        this.todaymeals.push({ "name": title, "isChecked": true });
        this.searchTerm = '';
    };
    TrackMealPage.prototype.removeFromList = function (item) {
        this.todaymeals = this.todaymeals.filter(function (el) { return el.name != item.name; });
    };
    TrackMealPage.prototype.editMeal = function () {
        this.alertCtrl.create({
            header: "Header",
            subHeader: "Subheader",
            message: "Edit Meal",
            buttons: ['Ok']
        }).then(function (alert) { return alert.present(); });
    };
    TrackMealPage.prototype.handleSwipeLeft = function () {
        var nextday = parseInt(this.day) + 1;
        this.globalServices.swipeLeft("/track-meal/" + nextday);
    };
    TrackMealPage.prototype.handleSwipeRight = function () {
        if (this.day > 1) {
            var prevday = parseInt(this.day) - 1;
            this.globalServices.swipeRight("/track-meal/" + prevday);
        }
    };
    TrackMealPage.prototype.press = function () {
        console.log("press");
    };
    TrackMealPage = tslib_1.__decorate([
        Component({
            selector: 'app-track-meal',
            templateUrl: './track-meal.page.html',
            styleUrls: ['./track-meal.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [MovieService, AlertController, Router,
            GlobalServicesService, ActivatedRoute])
    ], TrackMealPage);
    return TrackMealPage;
}());
export { TrackMealPage };
//# sourceMappingURL=track-meal.page.js.map