import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-weighin-modal',
  templateUrl: './weighin-modal.page.html',
  styleUrls: ['./weighin-modal.page.scss'],
})
export class WeighinModalPage implements OnInit {
  today = new Date();
  date = this.datePipe.transform(this.today, 'yyyy-MM-dd');
  weighInForm: FormGroup;
  weightOptions = [];
  fatOptions = [];
  weighIn = {
    area1: 0,
    area2: 0,
    area3: 0,
    weight: 0,
    bodyfat: 0,
    leanmass: 0
  }
  bodyWeight: number;
  bodyFat: number;
  leanMass: number;

  constructor(
    private formBuilder: FormBuilder,
    public modalController: ModalController,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
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
    this.bodyFat = Math.round((this.weighInForm.value.area1 + this.weighInForm.value.area2 + this.weighInForm.value.area3) / 3); 
    this.leanMass = 100 - this.bodyFat;
  }

}
