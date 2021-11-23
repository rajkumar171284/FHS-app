import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Myclass, sensorId } from '../../myclass'
import { interval, Subscription } from 'rxjs';

import { ApiService } from '../../api.service';
import { LoginPage } from '../../pages/login/login.page';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

import { icon, latLng, Map, marker, point, polyline, tileLayer } from 'leaflet';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss'],
  providers: [PhotoViewer,FormBuilder]
})
export class DiagramComponent implements OnInit, OnDestroy {
  loading: any;
  Subscription: Subscription;
  interVal: Subscription;
  hide: boolean = false;
  sliderOpt;
  options;
  constructor(private photoViewer: PhotoViewer, private loadingController: LoadingController, private ApiService: ApiService, private fb: FormBuilder,
    public modalController: ModalController) {
    
    this.options = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        })
      ],
      zoom: 7,
      center: latLng([ 46.879966, -121.726909 ])
    };
  }
  myClass = new Myclass();

  ngOnInit() {
    this.sliderOpt = {
      zoom: {
        maxRatio: 3,
      },
    };

    // this.getDataforSVG();
  }
  ionViewWillEnter() {
    console.log('enter')
    // this.photoViewer.show('https://mysite.com/path/to/image.jpg', 'My image title', {share: false});
    this.loadingController.create({
      message: 'Loading...'
    }).then((response) => {
      this.loading = response;
      this.loading.present();
    // this.interVal = interval(2000).subscribe(res => {
    //   this.getDataforSVG();
    // })
    this.getDataforSVG();
    });

    // 
  }

  getDataforSVG() {

    this.myClass.data = []

    let params = {}
    this.Subscription = this.ApiService.getSVGData(params).subscribe((response) => {
      if (response && response.length > 0) {
        this.myClass.screenLoader = false
        this.myClass.data = response;
        // console.log(response)
        this.myClass.response = this.myClass.data.map(item => {

          item.yPos = 0
          item.xPos = 0
          item.zonexPos=0;
          item.zoneyPos=0;
          let width = window.innerWidth;
          console.log(width)
          if (item.zone.toUpperCase() == 'IBD') {
            item.yPos = 46
            item.xPos = 47
            item.zonexPos=25

          }
          else if (item.zone.toUpperCase() == 'SMD') {
              item.yPos = 28
              item.xPos = 73
              item.zoneyPos=-33 
          } else if (item.zone.toUpperCase() == 'ABD') {
              item.yPos = 63
              item.xPos = 28
              item.zonexPos=25
          } else if (item.zone.toUpperCase() == 'PLP') {
            item.yPos = 19
            item.xPos = 2
            item.zoneyPos=-44
          }
          item.yPos = item.yPos + '%'
          item.xPos = item.xPos + '%';
          item.zonexPos=item.zonexPos+ 'px';
          item.zoneyPos=item.zoneyPos+ 'px';
          return item;
        });
      }
      this.dismissLoader()

      // console.log(this.myClass)
    },(error)=>{
      this.dismissLoader()
    })
  }
  ngOnDestroy() {
    this.Subscription.unsubscribe()
    if (this.interVal) {
      this.interVal.unsubscribe()
    }
  }
  ionViewWillLeave() {
    console.log('left')
    if (this.Subscription) {
      this.Subscription.unsubscribe()
    }
    if (this.interVal) {
      this.interVal.unsubscribe()
    }
  }

  // Simple loader
  simpleLoader() {
    this.loadingController.create({
      message: 'Loading img...'
    }).then((response) => {
      this.loading = response;
      this.loading.present();
      this.getDataforSVG();
    });
  }
  // Dismiss loader
  dismissLoader() {
    let dismiss;
    this.loadingController.dismiss().then((response) => {
      console.log('Loader closed! now', response);
      dismiss = response;
      // this.loading.dismiss()

    }).catch((err) => {
      // this.loading.dismiss()

      console.log('Error occured : ', err);
    });
  }
}
