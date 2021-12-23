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

  }
  ngOnDestroy(){
  }
}
