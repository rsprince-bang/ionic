import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BodyFatInfoComponent } from '../body-fat-info/body-fat-info/body-fat-info.component';

@Component({
  selector: 'app-weighin-main',
  templateUrl: './weighin-main.component.html',
  styleUrls: ['./weighin-main.component.scss'],
})
export class WeighinMainComponent implements OnInit {
  date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  weighInForm: FormGroup;
  weightOptions = [];
  fatOptions = [];
  bodyWeight: number;
  bodyFatPct: number;
  bodyFatLbs: number;
  leanMassPct: number;
  leanMassLbs: number;
  gender: string = "F"; // get gender from data

  constructor(
    private formBuilder: FormBuilder,
    public modalController: ModalController,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    console.log(this.date);
    this.weighInForm = this.formBuilder.group({
      area1: ['', [ Validators.required ]],
      area2: ['', [ Validators.required ]],
      area3: ['', [ Validators.required ]],
      weight: ['', [ Validators.required ]],
    });

    this.generateFat(0, 50);
    this.generateWeights(90, 300);
  }

  dismiss() {
    this.modalController.dismiss();
  }

  // generate weight options
  generateWeights(start, end) {
    for(let i = start; i <= end; i++){
      this.weightOptions.push(i);
    }
    return true;
  }

  // generate weight options
  generateFat(start, end) {
    for(let i = start; i <= end; i++){
      this.fatOptions.push(i);
    }
    return true;
  }

  calculateBodyMass() {
    this.bodyFatPct = Math.round((this.weighInForm.value.area1 + this.weighInForm.value.area2 + this.weighInForm.value.area3) / 3); 
    this.leanMassPct = 100 - this.bodyFatPct;
    this.bodyFatLbs = this.weighInForm.value.weight * (this.bodyFatPct/100);
    this.leanMassLbs = this.weighInForm.value.weight - this.bodyFatLbs;
  }

  showBodyFatInfo() {
    console.log("Body Fat Info");
    const nav = document.querySelector('ion-nav');
    nav.push(BodyFatInfoComponent);
  }

}
