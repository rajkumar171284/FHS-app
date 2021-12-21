import { Component } from '@angular/core';

import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';
import { ModalController,ToastController  } from '@ionic/angular';@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers:[ApiService]
})
export class HomePage {

  constructor() { }
  buttonVal1:any;
  ngOnInit() {
    // console.log('form')
  }

  
  
}
