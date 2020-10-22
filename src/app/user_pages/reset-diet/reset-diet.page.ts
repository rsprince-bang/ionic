import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-diet',
  templateUrl: './reset-diet.page.html',
  styleUrls: ['./reset-diet.page.scss'],
})
export class ResetDietPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  begin() {
    console.log({welcomeRead: true});
    this.router.navigateByUrl("/set-goals");
  }

}
