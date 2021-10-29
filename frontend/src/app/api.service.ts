import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import{map} from 'rxjs/operators'
import { environment } from 'src/environments/environment';
const params = new HttpParams()
  // .set('page', PageNo)
  // .set('sort', SortOn);

const hdr= new HttpHeaders()
.set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')
  .set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');


const option={
  headers:hdr
}
// var url="https://rajisltest.s3.ap-south-1.amazonaws.com/sample_data_10L.csv"
let myurl='http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getCSV(params:any):Observable<any>{
    return this.http.get(myurl+'/api/csv',option).pipe(map(response=>{
      return response;
    }))
  }

  getSVGData(params:any):Observable<any>{
    return this.http.post(environment.url+'/runtime',option).pipe(map(response=>{
      return response;
    }))
  }

  getAlertList(params:any):Observable<any>{
    return this.http.get(environment.url+'/alert/show',option).pipe(map(response=>{
      return response;
    }))
  }
  addSensorAlert(params:any):Observable<any>{
    return this.http.post(environment.url+'/alert/add',params,option).pipe(map(response=>{
      return response;
    }))
  }
  editSensorAlert(params:any):Observable<any>{
    return this.http.post(environment.url+'/alert/edit',params,option).pipe(map(response=>{
      return response;
    }))
  }
}
