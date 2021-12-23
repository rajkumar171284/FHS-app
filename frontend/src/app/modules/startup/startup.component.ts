import { Component, OnInit, OnDestroy,AfterViewInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { interval, Subscription } from 'rxjs';
import { Myclass, sensorId } from '../../myclass'
import * as L from 'leaflet';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css'],
   providers: [ApiService]
})


export class StartupComponent implements OnInit, OnDestroy,AfterViewInit {
  private map;

  hide:boolean=true;
  myClass: any;
  Subscription: Subscription;
  interVal: Subscription;
  options;
  constructor(private ApiService: ApiService) { }
  ngAfterViewInit(): void {
    this.initMap()

  }
  private initMap(): void {
    this.map = L.map('map', {
      center: [13.675989, 79.500493],
      zoom: 17
    });
    this.options = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      // maxZoom: 30,
      minZoom: 10,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    this.options.addTo(this.map);
  }
  ngOnInit(): void {


    this.myClass = new Myclass();
    this.myClass.screenLoader=true;
    // this.interVal = interval(2000).subscribe(res => {
    //   this.getDataforSVG();
    // })
    this.getDataforSVG();

  }
  async getSensorJSON() {
    const data = await fetch("assets/sensorList.json");
    const myItems = await data.json()
    // console.log(myItems)
   
    let that=this;
    let format = await myItems.map((z, aIndex) => {
      let newItem = that.myClass.sensorList.filter(res=>{
        // console.log(res,z)
        return res.sensorid==z.sensor;
      })
      // console.log(newItem)
      let newStatus=newItem[0]?newItem[0].status:'';
      let status = newStatus === 'active' ? 'active' : 'inactive';
      z.status;
      z.status = status;
      z.unit=newItem[0].unit;
      z.values1=newItem[0].values1;
      z.type=newItem[0].type;
      return z;
    })
    this.createMarker(format)
  }
  createMarker(myItems) {

    // let aIndex=0;
    console.log(myItems)
    for (let item of myItems) {
      var myIcon = null;
      let setShadowSize;
      let setShadowAnchor;
      if (item.status == 'active') {
        setShadowSize = [28, 55];
        setShadowAnchor = [-8, 114];
      }
      else if (item.status == 'inactive') {
        setShadowSize = [48, 75];
        setShadowAnchor = [2, 124];
      }
      myIcon = L.icon({
        iconUrl: '../../../assets/fire-hydrant.svg',
        iconSize: [35, 55],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowUrl: '../../../assets/' + `${item.status}` + '.svg',
        shadowSize: setShadowSize,
        shadowAnchor: setShadowAnchor
      });
      let statusColor=item.status=='active'?'text-success':'text-danger';
      console.log(statusColor)
      var customPopup = "<b class='text-primary'>Sensor:</b><b>"+`${item.sensor}` +"</b>&nbsp;&nbsp<b class='text-primary'>Status:</b><b class='text-uppercase " +`${statusColor}` +"'>"+`${item.status}` +"</b></b><br/><b class='text-primary'>Type:</b><b>"+`${item.type}` +"</b>&nbsp;&nbsp<b class='text-primary'>Unit:</b><b>"+`${item.unit}` +"</b>&nbsp;&nbsp<b class='text-primary'>Value:</b><b>"+`${item.values1}` +"</b>";

      

      var markers = new L.Marker(new L.LatLng(item.lat, item.lng), { icon: myIcon })
        .bindPopup(customPopup).addTo(this.map);

    }
    // aIndex++;
  }
  getDataforSVG() {
    let params = {}
    this.Subscription = this.ApiService.getSVGData(params).subscribe((response) => {
      if (response) {
        this.myClass.screenLoader=false
        this.myClass.data = response;
        this.myClass.sensorList = response;
        this.getSensorJSON();
        // console.log(response)
        // this.myClass.response = this.myClass.data.map(item => {

        //   item.yPos = 0
        //   item.xPos = 0
        //   item.zonexPos=0;
        //   item.zoneyPos=0;
        //   let width = window.innerWidth;
        //   console.log(width)
        //   if (item.zone.toUpperCase() == 'IBD') {
        //     item.yPos = 46
        //     item.xPos = 52
        //     item.zonexPos=46

        //   }
        //   else if (item.zone.toUpperCase() == 'SMD') {
        //       item.yPos = 32
        //       item.xPos = 83
        //       item.zoneyPos=-33 
        //   } else if (item.zone.toUpperCase() == 'ABD') {
        //       item.yPos = 66
        //       item.xPos = 28
        //       item.zonexPos=22
        //       item.zoneyPos=19
        //   } else if (item.zone.toUpperCase() == 'PLP') {
        //     item.yPos = 19
        //     item.xPos = 2
        //     item.zoneyPos=-44
        //   }
        //   item.yPos = item.yPos + '%'
        //   item.xPos = item.xPos + '%';
        //   item.zonexPos=item.zonexPos+ 'px';
        //   item.zoneyPos=item.zoneyPos+ 'px';
        //   return item;
        // });

      }


      console.log(this.myClass)
    })
  }

  async getSersorDetails(zone:string){
    // if(this.myClass. )
    return 

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
