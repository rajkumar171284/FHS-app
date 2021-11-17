import { Component, OnInit } from '@angular/core';
import { Myclass, sensorId, classSensor, interfaceSensor, interfaceSensorList, interfaceEditAlert } from '../../myclass'

@Component({
  selector: 'app-charts',
  templateUrl: './charts.page.html',
  styleUrls: ['./charts.page.scss'],
})
export class ChartsPage implements OnInit {
  myClass = new Myclass();
  chartFilters=[];
  chartInterval;
  constructor() {
    this.chartFilters=this.myClass.chartFilters.map(item=>{
      return {
        key:item,value:item

      } 
    })

    // initiate 
    this.chartInterval=this.chartFilters[0].value

   }

  ngOnInit() {
    
  }
  setInt(e){
    console.log(e,this.chartInterval)
  }

}
