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
        this.myClass.data = response;
        // console.log(response)
        this.myClass.response = this.myClass.data.map(item => {

          item.yPos = 0
          item.xPos = 0
          item.zonexPos=0;
          item.zoneyPos=0;
          let width = window.innerWidth;
          console.log(width)
          if (item.zone.toUpperCase() == 'IBD') {
            item.yPos = 46
            item.xPos = 52
            item.zonexPos=46

          }
          else if (item.zone.toUpperCase() == 'SMD') {
              item.yPos = 32
              item.xPos = 83
              item.zoneyPos=-33 
          } else if (item.zone.toUpperCase() == 'ABD') {
              item.yPos = 66
              item.xPos = 28
              item.zonexPos=22
              item.zoneyPos=19
          } else if (item.zone.toUpperCase() == 'PLP') {
            item.yPos = 19
            item.xPos = 2
            item.zoneyPos=-44
          }
          item.yPos = item.yPos + '%'
          item.xPos = item.xPos + '%';
          item.zonexPos=item.zonexPos+ 'px';
          item.zoneyPos=item.zoneyPos+ 'px';
          return item;
        });

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
