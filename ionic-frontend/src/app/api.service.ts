import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
let authorizationData = 'Basic ' + btoa('isliot' + ':' + 'isliot');
// let authorizationData = {username:'isliot',password:'isliot'}

import { Router } from '@angular/router';


import { Platform, IonRouterOutlet, ActionSheetController, PopoverController, ModalController, MenuController, ToastController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;

const hdr = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')
  .set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  .set('Authorization', "Basic " + btoa('isliot:isliot'))
// .set('Authorization',"Basic " +btoa(authorizationData.username+':'+authorizationData.password))


const option = {
  headers: hdr
}
// var url="https://rajisltest.s3.ap-south-1.amazonaws.com/sample_data_10L.csv"
// let myurl='http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,private platform: Platform,private router:Router) { 

    // this.platform.backButton.subscribeWithPriority(-1, () => {
    //   if (!this.routerOutlet.canGoBack()) {
    //     App.exitApp();
    //   }
    // });
  
  }


  clickBack(){
    console.log(this.router.url)
    this.platform.backButton.subscribeWithPriority(10,()=>{
      console.log(this.router.url)
      const currUrl=this.router.url;
      if(currUrl==='/'||currUrl==='/home'){
        navigator['app'].exitApp()
      }
      
    })
  }

  userLogin(params: any): Observable<any> {
    return this.http.post(environment.url + '/login/', params, option).pipe(map(response => {
      return response;
    }))
  }

  // getCSV(params:any):Observable<any>{
  //   return this.http.get(myurl+'/api/csv',option).pipe(map(response=>{
  //     return response;
  //   }))
  // }

  getSVGData(params: any): Observable<any> {
    return this.http.post(environment.influx_url + '/runtime', params, option).pipe(map(response => {
      return response;
    }))
  }

  getAlertList(params: any): Observable<any> {
    return this.http.get(environment.url + '/alert/show', option).pipe(map(response => {
      return response;
    }))
  }
  addSensorAlert(params: any): Observable<any> {
    return this.http.post(environment.url + '/alert/add', params, option).pipe(map(response => {
      return response;
    }))
  }
  editSensorAlert(params: any): Observable<any> {
    return this.http.post(environment.url + '/alert/edit', params, option).pipe(map(response => {
      return response;
    }))
  }
  // charts
  getChartData(params: any): Observable<any> {
    return this.http.post(environment.influx_url + '/charts/' + params.chartType, { "time_period": params.time_period }, option).pipe(map(response => {
      return response;
    }))
  }
}
