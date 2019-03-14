import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/services/api-call.service';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  userInfo = null;

  constructor(private myAPI: ApiCallService, private router: Router, public events: Events) { }

  ngOnInit() {
  }


  login() {
    
    this.myAPI.makeAPIcall(
      "test.php", 
      {
      "email": "test@test.com",
      "password": 12345
      }
    )
    .subscribe(
      (result) => {
        this.userInfo = result;

        localStorage.setItem("token", result.token);
        this.events.publish("user logged in", 1111, 2222); //test passsing args
        this.router.navigateByUrl("/home/tabs/tab2");
      }
    );

  }


}
