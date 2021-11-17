import { Component, OnInit ,OnDestroy} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Myclass, sensorId } from '../../myclass'
import { interval, Subscription } from 'rxjs';

import { ApiService } from '../../api.service';
import {LoginPage} from '../../pages/login/login.page';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss'],
  providers:[PhotoViewer]
})
export class DiagramComponent implements OnInit,OnDestroy {
  loading:any;
  Subscription: Subscription;
  interVal: Subscription;
 hide:boolean=false;
 sliderOpt;
  constructor(private photoViewer: PhotoViewer,private loadingController:LoadingController,private ApiService: ApiService, private fb: FormBuilder,
    public modalController: ModalController) { 
    console.log('h min ')

  }
  myClass=new Myclass();

  ngOnInit() {
    this.sliderOpt = {
      zoom: {
        maxRatio: 1,
      },
    };
    
    // this.getDataforSVG();
  }
  ionViewWillEnter(){
console.log('enter')
// this.photoViewer.show('https://mysite.com/path/to/image.jpg', 'My image title', {share: false});

// this.simpleLoader()
    // this.interVal = interval(2000).subscribe(res => {
    //   this.getDataforSVG();
    // })
    // this.getDataforSVG();
  }
  
  getDataforSVG() {
   
    this.myClass.data=[]

    let params = {}
    this.Subscription = this.ApiService.getSVGData(params).subscribe((response) => {
      if (response && response.length > 0) {
        this.myClass.screenLoader=false
        this.myClass.data=response;
        // console.log(response)
                  this.myClass.response = this.myClass.data.map(item => {

            item.yPos = 0
            item.xPos = 0
            let width= window.innerWidth;
            console.log(width)
            if(item.zone.toUpperCase()=='IBD'){
              item.yPos=88
              item.xPos=114
            }
            else if(item.zone.toUpperCase()=='SMD'){
              if(width){
                item.yPos=-23
                item.xPos=70
              }else{
              item.yPos=180
              item.xPos=220
              }
            } else if(item.zone.toUpperCase()=='ABD'){
              // item.yPos='300px'
              // item.xPos='670px'
              if(width<=400){
                item.yPos=190
                item.xPos=160
              }else{
              item.yPos=0
              item.xPos=0
              }
            } else if(item.zone.toUpperCase()=='PLP'){
              item.yPos=280
              item.xPos=32
            }
            item.yPos = item.yPos+'px'
            item.xPos = item.xPos+'px'
            return item;
          });      
      }
      this.dismissLoader()

      // console.log(this.myClass)
    })
  }
  ngOnDestroy(){
    this.Subscription.unsubscribe()
    if(this.interVal){
      this.interVal.unsubscribe()
    }
  }
  ionViewWillLeave(){
    console.log('left')
    if(this.Subscription){
    this.Subscription.unsubscribe()
    }
    if(this.interVal){
    this.interVal.unsubscribe()
  }
  }

  // Simple loader
  simpleLoader() {
    this.loadingController.create({
      message: 'Loading img...'
    }).then((response) => {
      this.loading=response;
      this.loading.present();
      this.getDataforSVG();
    });
  }
  // Dismiss loader
  dismissLoader() {
           let dismiss;   
    this.loadingController.dismiss().then((response) => {
      console.log('Loader closed! now', response);
      dismiss=response;
      // this.loading.dismiss()

    }).catch((err) => {
      // this.loading.dismiss()

      console.log('Error occured : ', err);
    });
  }
}
