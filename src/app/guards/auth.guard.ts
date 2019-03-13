import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalServicesService } from '../services/global-services.service';

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {

  constructor(private router: Router, private globalservice: GlobalServicesService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
 
    let userAuthenticated = this.globalservice.isLoggedIn();

    if ( !userAuthenticated ) {
      this.router.navigateByUrl('/login');
    } 

    return userAuthenticated;
  }

  
 }
