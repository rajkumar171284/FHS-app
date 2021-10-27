import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
// import * as L from 'leaflet';
import * as d3 from 'd3';
import * as d3Scale from 'd3';
import * as d3Shape from 'd3';
import * as d3Array from 'd3';
import * as d3Axis from 'd3';
import { GMapModule } from 'primeng/gmap';
import {ChartModule} from 'primeng/chart';

declare var google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('gmap', { static: false }) gmap;
  // mymap;
  options: any;

  overlays: any[];

  dialogVisible: boolean;

  markerTitle: string;

  selectedPosition: any;

  infoWindow: any;

  draggable: boolean;
  // chart starts
  public title = 'Line Chart';
  public data: any[] = [
    { date: new Date('2010-01-01'), value: 40 },
    { date: new Date('2010-01-04'), value: 93 },
    { date: new Date('2010-01-05'), value: 95 },
    { date: new Date('2010-01-06'), value: 130 },
    { date: new Date('2010-01-07'), value: 110 },
    { date: new Date('2010-01-08'), value: 120 },
    { date: new Date('2010-01-09'), value: 129 },
    { date: new Date('2010-01-10'), value: 107 },
    { date: new Date('2010-01-11'), value: 140 },
  ];
  private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any;
  private line: d3Shape.Line<[number, number]>; // this is line defination

  //prime chart
  data2:any;
  options2: any;

  constructor() {
    // configure margins and width/height of the graph
    this.width = 960 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
    // prime
    this.data2 = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };
    this.options2 = {
      title: {
          display: true,
          text: 'My Title',
          fontSize: 16
      },
      legend: {
          position: 'bottom'
      }
  };


  }

  ngAfterViewInit(): void {
    // let img = document.getElementById('mapid');
    // img.setAttribute("src", "https://maps.googleapis.com/maps/api/js?sensor=false&amp;libraries=places,drawing")
    //   this.mymap = L.map('mapid').setView([51.505, -0.09], 13);
    // this.loadMap()
    this.options = {
      center: { lat: 36.890257, lng: 30.707417 },
      zoom: 12
    };

    // this.initOverlays();

    // this.infoWindow = new google.maps.InfoWindow();
  }

  ngOnInit(): void {


    this.buildSvg();
    this.addXandYAxis();
    this.drawLineAndPath();
  }

  private buildSvg() {
    this.svg = d3.select('svg') // svg element from html
      .append('g')   // appends 'g' element for graph design
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }
  private addXandYAxis() {
    // range of data configuring
    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.x.domain(d3Array.extent(this.data, (d) => d.date));
    this.y.domain(d3Array.extent(this.data, (d) => d.value));
    // Configure the X Axis
    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));
    // Configure the Y Axis
    this.svg.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y));
  }
  private drawLineAndPath() {
    this.line = d3Shape.line()
      .x((d: any) => this.x(d.date))
      .y((d: any) => this.y(d.value));
    // Configuring line path
    this.svg.append('path')
      .datum(this.data)
      .attr('class', 'line')
      .attr('d', this.line);
  }

  // loadMap() {
  //   var myLatlng = new google.maps.LatLng(12.9094917, 80.2209766);

  //   var myOptions = {
  //     zoom: 13,
  //     center: myLatlng,
  //     disableDefaultUI: true,
  //     mapTypeId: google.maps.MapTypeId.SATELLITE ,
  //     mapTypeControl: false,
  //     streetViewControl: false,
  //     fullscreenControl: false
  //   }

  //   this.mymap = new google.maps.Map(this.mapid.nativeElement, myOptions);
  // }

  initOverlays() {
    if (!this.overlays || !this.overlays.length) {
      this.overlays = [
        new google.maps.Marker({ position: { lat: 36.879466, lng: 30.667648 }, title: "Konyaalti" }),
        new google.maps.Marker({ position: { lat: 36.883707, lng: 30.689216 }, title: "Ataturk Park" }),
        new google.maps.Marker({ position: { lat: 36.885233, lng: 30.702323 }, title: "Oldtown" }),
        new google.maps.Polygon({
          paths: [
            { lat: 36.9177, lng: 30.7854 }, { lat: 36.8851, lng: 30.7802 }, { lat: 36.8829, lng: 30.8111 }, { lat: 36.9177, lng: 30.8159 }
          ], strokeOpacity: 0.5, strokeWeight: 1, fillColor: '#1976D2', fillOpacity: 0.35
        }),
        new google.maps.Circle({ center: { lat: 36.90707, lng: 30.56533 }, fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: 1500 }),
        new google.maps.Polyline({ path: [{ lat: 36.86149, lng: 30.63743 }, { lat: 36.86341, lng: 30.72463 }], geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 2 })
      ];
    }
  }
  handleMapClick(event) {
    this.dialogVisible = true;
    this.selectedPosition = event.latLng;
  }

  handleOverlayClick(event) {
    let isMarker = event.overlay.getTitle != undefined;

    if (isMarker) {
      let title = event.overlay.getTitle();
      this.infoWindow.setContent('<div>' + title + '</div>');
      this.infoWindow.open(event.map, event.overlay);
      event.map.setCenter(event.overlay.getPosition());

      // this.messageService.add({severity:'info', summary:'Marker Selected', detail: title});
    }
    else {
      // this.messageService.add({severity:'info', summary:'Shape Selected', detail: ''});
    }
  }
  handleDragEnd(event) { }
}
