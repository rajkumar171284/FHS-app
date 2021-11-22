import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../api.service';
import { interval, Subscription } from 'rxjs';
import { Myclass, sensorId } from '../../myclass'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ApiService]

})
export class DashboardComponent implements OnInit,OnDestroy {
  myClass=new Myclass();
  Subscription: Subscription;
  interVal: Subscription;
  display=true
  constructor(private ApiService: ApiService) { }

  ngOnInit(): void {
    this.myClass = new Myclass();
    this.myClass.screenLoader=true;
    
  }
  

  ngOnDestroy(){
  }
}
