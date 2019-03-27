import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-track-progress',
  templateUrl: './track-progress.page.html',
  styleUrls: ['./track-progress.page.scss'],
})
export class TrackProgressPage implements OnInit {

  items = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get('https://randomuser.me/api/?results=300').subscribe( res => {
      this.items = res['results'];
      //console.log(this.items);
    });
  }

}
