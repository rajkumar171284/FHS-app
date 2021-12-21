import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Myclass, sensorId } from '../../myclass'
import { interval, Subscription } from 'rxjs';

import { ApiService } from '../../api.service';
import { LoginPage } from '../../pages/login/login.page';
// import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Network } from '@ionic-native/network/ngx';

import { icon, latLng, Map, marker, point, polyline, tileLayer } from 'leaflet';
import * as L from 'leaflet';
@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss'],
  providers: [FormBuilder, Network]
})
export class DiagramComponent implements OnInit, AfterViewInit, OnDestroy {
  loading: any;
  Subscription: Subscription;
  interVal: Subscription;
  hide: boolean = false;
  sliderOpt;
  options;
  private map;

  constructor(private network: Network, private loadingController: LoadingController, private ApiService: ApiService, private fb: FormBuilder,
    public modalController: ModalController) {

  }
  myClass = new Myclass();

  ngAfterViewInit(): void {

  }
  private initMap(): void {
    this.map = L.map('map', {
      center: [13.675989, 79.500493],
      zoom: 17
    });
    this.options = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      // maxZoom: 30,
      minZoom: 10,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    this.options.addTo(this.map);
  }

  ionViewDidEnter() {
    this.initMap()

  }
  ngOnInit() {
    // this.sliderOpt = {
    //   zoom: {
    //     maxRatio: 3,
    //   },
    // };

  }
  checkNetConn() {
    console.log('conn')
    // watch network for a disconnection
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');

    });

  }
  async getSensorJSON() {
    const data = await fetch("assets/sensorList.json");
    const myItems = await data.json()
    // console.log(myItems)   
    // let format = await myItems.map((z, aIndex) => {
    //   let newItem = this.myClass.sensorList.status[aIndex]
    //   let status = newItem === 'a' ? 'active' : 'inactive';
    //   z.status;
    //   z.status = status;
    //   return z;
    // })
    let that=this;
    let format = await myItems.map((z, aIndex) => {
      let newItem = that.myClass.sensorList.filter(res=>{
        return res.sensor==z.sensor;
      })
      let newStatus=newItem[0]?newItem[0].status:'';
      let status = newStatus === 'a' ? 'active' : 'inactive';
      z.status;
      z.status = status;
      return z;
    })
    this.createMarker(format)
  }
  createMarker(myItems) {

    // let aIndex=0;
    console.log(myItems)
    for (let item of myItems) {
      var myIcon = null;
      let setShadowSize;
      let setShadowAnchor;
      if (item.status == 'active') {
        setShadowSize = [28, 55];
        setShadowAnchor = [-8, 114];
      }
      else if (item.status == 'inactive') {
        setShadowSize = [48, 75];
        setShadowAnchor = [2, 124];
      }
      myIcon = L.icon({
        iconUrl: '../../../assets/fire-hydrant.svg',
        iconSize: [35, 55],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowUrl: '../../../assets/' + `${item.status}` + '.svg',
        shadowSize: setShadowSize,
        shadowAnchor: setShadowAnchor
      });
      var customPopup = "<b class='tsts'>Sensor:"+`${item.sensor}` +"</b><br/><b>Status:"+`${item.status}` +"</b><br/>";

      

      var markers = new L.Marker(new L.LatLng(item.lat, item.lng), { icon: myIcon })
        .bindPopup(customPopup).addTo(this.map);

    }
    // aIndex++;
  }
  ionViewWillEnter() {
    this.checkNetConn();

    this.loadingController.create({
      message: 'Loading...'
    }).then((response) => {
      this.loading = response;
      this.loading.present();
      this.interVal = interval(10000).subscribe(res => {
        this.getDataforSVG();
      })
      // this.getDataforSVG();
    });

    // 
  }

  getDataforSVG() {

    this.myClass.data = []

    let params = {}
    this.Subscription = this.ApiService.getSVGData(params).subscribe((response) => {
      if (response) {
        this.myClass.screenLoader = false
        this.myClass.data = response;
        this.myClass.sensorList = response;
        this.getSensorJSON();

        // var array = [];
        // array = response.id.map((x, i) => {
        //   return {
        //     sensor: x,
        //     lat: response.lat[i],
        //     lng: response.lng[i]
        //   }
        // })
        // console.log(JSON.stringify(array))



        // console.log(response)
        // this.myClass.response = this.myClass.data.map(item => {

        //   item.yPos = 0
        //   item.xPos = 0
        //   item.zonexPos = 0;
        //   item.zoneyPos = 0;
        //   let width = window.innerWidth;
        //   console.log(width)
        //   if (item.zone.toUpperCase() == 'IBD') {
        //     item.yPos = 46
        //     item.xPos = 47
        //     item.zonexPos = 25

        //   }
        //   else if (item.zone.toUpperCase() == 'SMD') {
        //     item.yPos = 28
        //     item.xPos = 73
        //     item.zoneyPos = -33
        //   } else if (item.zone.toUpperCase() == 'ABD') {
        //     item.yPos = 63
        //     item.xPos = 28
        //     item.zonexPos = 25
        //   } else if (item.zone.toUpperCase() == 'PLP') {
        //     item.yPos = 19
        //     item.xPos = 2
        //     item.zoneyPos = -44
        //   }
        //   item.yPos = item.yPos + '%'
        //   item.xPos = item.xPos + '%';
        //   item.zonexPos = item.zonexPos + 'px';
        //   item.zoneyPos = item.zoneyPos + 'px';
        //   return item;
        // });
      }
      this.dismissLoader()

      // console.log(this.myClass)
    }, (error) => {
      this.dismissLoader()
    })
  }
  ngOnDestroy() {
    this.Subscription.unsubscribe()
    if (this.interVal) {
      this.interVal.unsubscribe()
    }
    this.map.remove()
  }
  ionViewWillLeave() {
    console.log('left')
    if (this.Subscription) {
      this.Subscription.unsubscribe()
    }
    if (this.interVal) {
      this.interVal.unsubscribe()
    }
    this.map.remove();
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
