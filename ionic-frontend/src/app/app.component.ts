import { Component } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';

import { IonRouterOutlet, Platform, AlertController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;
import { ApiService } from './api.service';

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [Network, StatusBar]
})
export class AppComponent {
  constructor(private location: Location,
    public alertCtrl: AlertController, private statusBar: StatusBar, private ApiService: ApiService, private network: Network, private platform: Platform,
    // private routerOutlet: IonRouterOutlet
  ) {
    this.initApp();
    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      if (this.location.isCurrentPathEqualTo('/home') || this.location.isCurrentPathEqualTo('/')) {
        this.confirmExitApp();
        processNextHandler();
      } else {
        this.location.back();
      }
    });


  }



  checkNetConn() {
    // watch network for a disconnection
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');

    });
  }

  initApp() {
    this.platform.ready().then(() => {
      console.log('ready')
      this.statusBar.styleDefault();
      this.checkNetConn();
      // this.ApiService.clickBack()
    })

  }
  async confirmExitApp() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmation Exit',
      message: 'Are you sure you want to exit ?',
      backdropDismiss: false,
      cssClass: 'confirm-exit-alert',
      buttons: [{
        text: 'Stay',
        role: 'cancel',
        handler: () => {
          console.log('Application exit  handler');
        }
      }, {
        text: 'Exit apps',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    });

    await alert.present();
  }

}
