import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalServicesService {

  constructor() { }

  isLoggedIn(){

    let token = localStorage.getItem('token');


    if (token){
      return true;
    }
    else{
      return false;
    }

  }
}
