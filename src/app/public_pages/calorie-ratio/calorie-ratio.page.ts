import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { FoodSuggestionsService } from 'src/app/services/food-suggestions.service';
import * as pluginLabels from 'chartjs-plugin-labels';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calorie-ratio',
  templateUrl: './calorie-ratio.page.html',
  styleUrls: ['./calorie-ratio.page.scss'],
})
export class CalorieRatioPage implements OnInit {

	// Data needed from API or calculation
	calorieRatio = { fat: 26, protein: 24, carbs: 50 };

	// dayNutritionInfo = {'phase':null, phaseday:null, daynutrition:{protein:null, carbs:null, fat:null}};
	
  // PIE CHART VARIABLES
  pieChartOptions: ChartOptions;
  pieChartLabels: Label[];
  pieChartData: SingleDataSet;
  pieChartType: ChartType;
  pieChartLegend: boolean;
  pieChartPlugins = [];
  pieChartColors = [
    {
      backgroundColor: ['#2CA500', '#00B8FF', '#FF00CB'],
    },
  ];

  constructor(
		private router: Router
	) { }

  ngOnInit() {
    // CALORIE RATIO CHART SETTINGS
    this.pieChartOptions = this.createOptions();
    this.pieChartLabels = ['Fat', 'Protein', 'Carbs'];
    this.pieChartData = [this.calorieRatio.fat, this.calorieRatio.protein, this.calorieRatio.carbs];
    this.pieChartType = 'doughnut';
    this.pieChartLegend = true;
		this.pieChartPlugins = [pluginLabels];
	}
	
	// PIE CHART OPTIONS
	private createOptions(): ChartOptions {
		return {
			responsive: true,
					maintainAspectRatio: true,
					plugins: {
							labels: {
								render: 'percentage',
								fontColor: ['white', 'white', 'white'],
								precision: 0
							}
					},
					legend: {
						labels: {
							usePointStyle: true
						}
					}
		};
	}

	getCalorieRatio() {
		// Add functionality to get ratio.
	}

	continue() {
		this.router.navigateByUrl("/tabs/home");
	}

}
