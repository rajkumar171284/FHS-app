import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../api.service';
import { interval, Subscription } from 'rxjs';
import { Myclass, sensorId } from '../../myclass'

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css'],
   providers: [ApiService]
})


export class StartupComponent implements OnInit, OnDestroy {
  hide:boolean=true;
  myClass: any;
  Subscription: Subscription;
  interVal: Subscription;
  constructor(private ApiService: ApiService) { }

  ngOnInit(): void {
    //  console.log(document.querySelector("#path80"))
    //  let main=document.getElementById("datalist");

    //   let innerDiv = document.createElement("span");
    //   innerDiv.style.display="inline-block"
    //   innerDiv.innerHTML="Plant-1"
    //   innerDiv.style.marginLeft="30px";
    //   innerDiv.style.width="150px";
    //   innerDiv.style.height="50px"
    //   innerDiv.style.borderRadius="3px"
    //   innerDiv.style.boxShadow="0 1px 2px #000";
    //   innerDiv.style.background="rgba(0,0,0,.4)";
    //   innerDiv.style.color="#fff";
    //   innerDiv.style.padding="10px";
    //   main.appendChild(innerDiv)
    // this.loadLabels()


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

  async getSersorDetails(zone:string){
    // if(this.myClass. )
    return 

  }

  loadLabels() {
    if (document.getElementById('text8498')) {
      let tspan8496 = document.getElementById('text8498');

      let innerDiv = document.createElement("tspan");
      innerDiv.style.display = "inline-block"
      innerDiv.innerHTML = "Plant-1"
      innerDiv.style.marginLeft = "30px";
      innerDiv.style.width = "150px";
      innerDiv.style.height = "50px"
      innerDiv.style.borderRadius = "3px"
      innerDiv.style.boxShadow = "0 1px 2px #000";
      innerDiv.style.background = "rgba(0,0,0,.4)";
      innerDiv.style.color = "#fff";
      innerDiv.style.padding = "10px";
      tspan8496.appendChild(innerDiv)


    }
  }
   getSensorById(array,id:any){
    if(id){
      array= this.myClass.data.filter((item)=>item.sensorid==id)
      // console.log(array)
      return array[0].zone
    }
    

  }
  getId(){
    return false
  }
  ngOnDestroy() {
    this.Subscription.unsubscribe();
    this.interVal.unsubscribe();
  }
}
