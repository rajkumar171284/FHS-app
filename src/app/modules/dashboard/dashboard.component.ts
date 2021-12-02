import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../api.service';
import { interval, Subscription } from 'rxjs';
import { Myclass, filters, } from '../../myclass'

class newArr{
  pressureData='';levelData=''

}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ApiService]

})
export class DashboardComponent implements OnInit,OnDestroy {
  // filter
  chartFilters = [];
    chartInterval;

  myClass=new Myclass();
  Subscription: Subscription;
  interVal: Subscription;
  display=true;
  plotlyData:any=new newArr()

  constructor(private ApiService: ApiService) { }

  ngOnInit(): void {
    this.myClass = new Myclass();
    this.myClass.screenLoader=true;
    
    // this.chartFilters=filters.map(item => {
    //     console.log(item)
    //     return {
    //       "key": item, "value": item
  
    //     }
    //   })
  
    //   // initiate 
    //   this.chartInterval = this.chartFilters[0].value;
    //   this.loadChart()

  }
  
  // setInt(e) {
  //   console.log(e, this.chartInterval)
  //   this.loadChart()
  // }
  // loadChart() {
  //   this.plotlyData=new newArr();
  //     let params: any = {}
  //     params.chartType = 'pressure';
  //     params.time_period = this.chartInterval,
  //       this.ApiService.getChartData(params).subscribe(response => {
  //         console.log(response)
          
  //         let newResponse=Object.keys(response).map((x,i)=>{
  //           let str;
  //           if(i==0){
  //             str='#e40000'
  //           }         
  //           if(i==1){
  //             str='green'
  //           }         
  //           if(i==2){
  //             str='blue'
  //           }         
  //           if(i==1){
  //             str='orange'
  //           }         
  //           if(i==1){
  //             str='yellow'
  //           }         
  //           return {
  //             sensor:x,
  //             array:Object.values(response)[i],
  //             color:str
  //           }
  //         })

          
  //         this.plotlyData.pressureData=newResponse.map(x=>{
  //           return x;
  //         })
  //         let params: any = {}
  //         params.chartType = 'level';
  //         // this.ApiService.getChartData(params).subscribe(response2 => {
  //         //   console.log(response2)
  //         // //   this.plotlyData.levelData;
  //         // // this.plotlyData.levelData=response.map(x=>{
  //         // //   return x;            
  //         // // })
  //         //   this.dismissLoader()
  //         // })
  //       })
  // }
  ngOnDestroy(){
  }
}
