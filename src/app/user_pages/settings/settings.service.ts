import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  dataUrl: string = 'assets/apis/current-settings.json'; // change this to endpoint.
  data: any;

  constructor(private http: HttpClient) { }

  getData() {
    this.data = this.http.get(this.dataUrl);
    return this.data;
  }

}
