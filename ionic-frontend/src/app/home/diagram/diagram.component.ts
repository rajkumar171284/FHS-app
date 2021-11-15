import { Component, OnInit ,OnDestroy} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Myclass, sensorId } from '../../myclass'
import { interval, Subscription } from 'rxjs';

import { ApiService } from '../../api.service';
import {LoginPage} from '../../pages/login/login.page'
@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss'],
})
export class DiagramComponent implements OnInit,OnDestroy {
  loading:any;
  Subscription: Subscription;
  interVal: Subscription;

  constructor(private loadingController:LoadingController,private ApiService: ApiService, private fb: FormBuilder,
    public modalController: ModalController) { 
    console.log('h min ')

  }
  myClass=new Myclass();

  ngOnInit() {
   
      // this.interVal = interval(2000).subscribe(res => {
    //   this.getDataforSVG();
    // })
    this.getDataforSVG();
  }

  
  getDataforSVG() {
    // this.simpleLoader()
    let params = {}
    this.Subscription = this.ApiService.getSVGData(params).subscribe((response) => {
      if (response && response.length > 0) {
        this.myClass.screenLoader=false
        this.myClass.data=[]
        response.forEach(newItem => {
          let index = this.myClass.data.findIndex((rec: sensorId) => {
            return rec.sensorid == newItem.sensorid;
          })
          if (index == -1) {
            // not found then add fresh
            // history
            let item: any = {};
            item.sensorid = newItem.sensorid;
            item.history = [newItem];
            item.lat = newItem.lat
            item.lng = newItem.lng
            item.zone = newItem.zone
            item.type = newItem.type
            item.unit = newItem.unit
            item.value = newItem.value
            item.date = newItem.date
            item.status = newItem.status

            this.myClass.data.push(item);

          } else {
            // update lat/lng 

            this.myClass.data.filter((newObj: sensorId) => {
              return newObj.sensorid == response[index].sensorid;
            }).map((result: sensorId) => {
              result.history.push(response[index])
            })

          }
          this.myClass.response = this.myClass.data.map(item => {

            item.yPos = 0
            item.xPos = 0
            let width= window.innerWidth;
            console.log(width)
            if(item.zone.toUpperCase()=='IBD'){
              item.yPos='475px'
              item.xPos='545px'
            }
            else if(item.zone.toUpperCase()=='SMD'){
              if(width){

              }
              item.yPos=180
              item.xPos=220
            } else if(item.zone.toUpperCase()=='ABD'){
              item.yPos='300px'
              item.xPos='670px'
            } else if(item.zone.toUpperCase()=='PLP'){
              item.yPos=35
              item.xPos=113
            }
            return item;
          });

        //   var a = document.getElementById("alphasvg");
        //   console.log(a)

        //   var svgDoc = a.getElementsByClassName('text8498');
        //  for(let i=0;i<svgDoc.length; i++)
        //  svgDoc[i].setAttribute('')
        //   // text8498


        })

      
      }
      this.dismissLoader()

      console.log(this.myClass)
    })
  }
  ngOnDestroy(){
    this.Subscription.unsubscribe()
    this.interVal.unsubscribe()
  }

  // Simple loader
  simpleLoader() {
    this.loadingController.create({
      message: 'Loading...'
    }).then((response) => {
      response.present();
    });
  }
  // Dismiss loader
  dismissLoader() {
    this.loadingController.dismiss().then((response) => {
      console.log('Loader closed!', response);
    }).catch((err) => {
      console.log('Error occured : ', err);
    });
  }
}
