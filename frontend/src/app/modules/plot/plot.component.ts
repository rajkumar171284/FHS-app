import { Component, OnInit, OnChanges, SimpleChanges, Input, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';
import { InterfacePlotlyPattern1, ClassPlotlyPattern1 } from '../../myclass';
declare let Plotly: any;
import * as moment from 'moment';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() chartId: any;
  @Input() plotlyData;
  @Input() chartType;
  @Input() graphType;
  @ViewChild('chartElementId', { read: ElementRef, static: false }) chartElementId: ElementRef;
  @ViewChildren(PlotComponent) myCom: QueryList<PlotComponent>
  public data: any;
  public layout: any;
  // public data2: any;
  // public layout2: any;
  public graph = new ClassPlotlyPattern1();
  pie_chart;
  minHeight;
  /* The plot target container. */
  constructor() { }


  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {

  }
  ngAfterViewInit() {
    console.log(this.myCom.length)
    this.minHeight = window.innerHeight - 400;
    // this.minHeight = 250;
    // console.log(this.minHeight)
    console.log(this.plotlyData)
    //  call multi
    // if (changes.chartType.currentValue == 'Pressure') {
    if (this.plotlyData && this.chartType == 'Pressure') {

      // const arr = changes.plotlyData.currentValue.pressureData
      this.multiPlot(this.plotlyData.pressureData)
    }
    if (this.plotlyData && this.chartType == 'Level') {
      // const arr = changes.
      this.graph.data = []

      this.multiPlot2(this.plotlyData.levelData)
    }

  }



  public multiPlot(Data) {
    this.graph.data = []
    for (let a of Data) {

      // json given by shum 
      //   let item={
      //     x: a.array.ts.map(ele =>ele),
      //     y: a.array.val.map(ele =>ele),
      //     mode: 'lines+points',
      //     name: a.sensor,
      //     line: {
      //       color: a.color,
      //       width: 2
      //     }
      //   }
      // }


      // json by krs
      let item = {
        x: Data[0].array.array.map(a => moment(a.date).format("HH:mm:ss")),
        y: a.array.array.map(ele => ele.values1 ? ele.values1 : 0),
        type: 'lines',
        mode: 'lines+markers',
        name: 'Sensor-' + a.sensor,
        line: {
          color: a.color,
          width: 1
        }
      }
      this.graph.data.push(item)
    }
    this.graph.layout = {
      autosize: true, height: this.minHeight, title: this.chartType,
      plot_bgcolor: 'rgba(0, 0, 0, 0)',
      paper_bgcolor: 'rgba(255,255,255,.3)', margin: {
        t:30,
        l: 20, r: 20,
      },
      marker: { color: 'red' },
      showlegend: true,
      legend: {"orientation": "v"}
    }
    Plotly.newPlot(this.chartElementId.nativeElement, this.graph.data, this.graph.layout,{responsive: true});
    // console.log(this.graph)
  }

  public multiPlot2(Data) {
      // 
      // let item={
      //   x: a.array.ts.map(ele => ele),
      //   y: a.array.val.map(ele => ele),
      //   mode: 'lines+points',
      //   name: a.sensor,
      //   line: {
      //     color: a.color,
      //     width: 2
      //   }

      // }
      // json by krs
      let item = {
        x: Data.map(a=>moment(a.array.date).format("HH:mm:ss")) ,
        y: Data.map(a=>a.array.values1),
        type: 'lines',
        mode: 'lines+markers',
        name: 'Sensor-' + Data[0].sensor ,
        line: {
          color:Data[0].color ,
          width: 1
        }
      }
      this.graph.data.push(item)
    
    this.graph.layout = {
      autosize: true, height: this.minHeight, title: this.chartType,
      margin: {
        t:30,
        l: 20, r: 20,
      },
      marker: { color: 'red' },
      showlegend: true,
      legend: {"orientation": "v"},
      plot_bgcolor: 'rgba(0, 0, 0, 0)',
      paper_bgcolor: 'rgba(255,255,255,.3)',
      // fig_bgcolor :"red" //not works
    }
    Plotly.newPlot(this.chartElementId.nativeElement, this.graph.data, this.graph.layout,{responsive: true});
    console.log(this.graph)
  }
}
