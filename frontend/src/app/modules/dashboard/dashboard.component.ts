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
    // this.interVal = interval(2000).subscribe(res => {
    //   this.getDataforSVG();
    // })
    this.getDataforSVG();
  }
  

  getDataforSVG() {
    let params = {}
    this.Subscription = this.ApiService.getSVGData(params).subscribe((response) => {
      if (response && response.length > 0) {
        this.myClass.screenLoader=false

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

            item.yPos = ''
            item.xPos = ''

            // let zone = item.zone;
            //  (zone) => {
            //   // let yPos
            //   item.yPos = zone.toUpperCase() == 'IBD' ? 260
            //     : zone.toUpperCase() == 'SMD' ? 180
            //       : zone.toUpperCase() == 'ABD' ? 420
            //         : ''
            // }
            // item.xPos = zone => {
            //   // let yPos
            //   return zone.toUpperCase() == 'IBD' ? 663
            //     : zone.toUpperCase() == 'SMD' ? 220
            //       : zone.toUpperCase() == 'ABD' ? 365
            //         : ''
            // }
            if(item.zone.toUpperCase()=='IBD'){
              item.yPos=260
              item.xPos=663
            }
            else if(item.zone.toUpperCase()=='SMD'){
              item.yPos=180
              item.xPos=220
            } else if(item.zone.toUpperCase()=='ABD'){
              item.yPos=420
              item.xPos=365
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


      console.log(this.myClass)
    })
  }
  ngOnDestroy(){
    this.Subscription.unsubscribe()
    this.interVal.unsubscribe()
  }
}
