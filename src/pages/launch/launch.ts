/*
 *
 * Copyright 2015 HISP Tanzania
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301, USA.
 *
 * @since 2015
 * @author Joseph Chingalo <profschingalo@gmail.com>
 *
 */
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { NetworkAvailabilityProvider } from '../../providers/network-availability/network-availability';
import { AppTranslationProvider } from '../../providers/app-translation/app-translation';

/**
 * Generated class for the LaunchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-launch',
  templateUrl: 'launch.html'
})
export class LaunchPage implements OnInit {
  logoUrl: string;

  constructor(
    private navCtrl: NavController,
    private UserProvider: UserProvider,
    private NetworkAvailabilityProvider: NetworkAvailabilityProvider,
    private appTranslationProvider: AppTranslationProvider
  ) {
    this.logoUrl = 'assets/img/logo.png';
  }

  ngOnInit() {
    this.NetworkAvailabilityProvider.setNetworkStatusDetection();
    this.UserProvider.getCurrentUser().subscribe(
      (user: any) => {
        let currentLanguage = 'en';
        if (user && user.currentLanguage) {
          currentLanguage = user.currentLanguage;
        }
        this.appTranslationProvider.setAppTranslation(currentLanguage);
        if (user && user.isLogin) {
          this.navCtrl.setRoot('HomePage');
        } else {
          this.navCtrl.setRoot('LoginPage');
        }
      },
      error => {}
    );
  }
}
