import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UserInfoPage } from '../user-info/user-info.page';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  constructor(
    private router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  resetDiet() {
    this.router.navigateByUrl('/reset-diet');
  }

  async openUserInfoModal() {
    const modal = await this.modalController.create({component: UserInfoPage});
    return await modal.present();
	}

  editUserInfo() {
    this.router.navigateByUrl('/user-info');
  }

}
