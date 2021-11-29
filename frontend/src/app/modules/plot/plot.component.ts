import { Component, OnInit, OnChanges, SimpleChanges, Input, ViewChild, ElementRef,AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InterfacePlotlyPattern1, ClassPlotlyPattern1 } from '../../myclass';
declare let Plotly: any;

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements OnInit,OnChanges {
  @Input() chartId:string;
  @Input() plotlyData;
  @Input() chartType;
  @Input() graphType;
  @ViewChild('pressureId',{ read: ElementRef, static:false }) pressureId: ElementRef;
  public data: any;
  public layout: any;
  // public data2: any;
  // public layout2: any;
  public graph = new ClassPlotlyPattern1();
  pie_chart;
  minHeight;
  fullData=[]
  /* The plot target container. */
  constructor() { }
  

  ngOnInit() {
  }
  
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  this.minHeight=window.innerHeight-395
    // if (this.plotlyData && this.plotlyData.pressureData && this.chartType == 'pressure') {
      console.log(this.plotlyData.pressureData)
      console.log(this.plotlyData)
      //  call multi
  if(changes.chartType.currentValue=='Pressure'){
    const arr =changes.plotlyData.currentValue.pressureData
    this.multiPlot(arr)
  }
  if(changes.chartType.currentValue=='Level'){
    const arr =changes.plotlyData.currentValue.levelData
    this.multiPlot2(arr)
  }
      
  }



  public multiPlot(Data) {
    this.graph.data = []
    for (let a of Data) {
      this.graph.data.push({
        x: a.array.ts.map(ele =>ele),
        y: a.array.val.map(ele =>ele),
        mode: 'lines+points',
        name: a.sensor,
        line: {
          color: a.color,
          width: 2
        }

      }

      )
    }
    this.graph.layout =
     { autosize: true,  height: this.minHeight, title: this.chartType,
      plot_bgcolor: 'rgba(0, 0, 0, 0)',
      paper_bgcolor: 'rgba(255,255,255,.3)'

    ,margin: {
      l: 20,r:20,       
    },
    marker: {color: 'red'} 
  
  }
  this.fullData.push(this.graph.data)

   console.log(this.graph)
  }

  public multiPlot2(Data) {
    // this.graph.data = []
    for (let a of Data) {
      this.graph.data.push({
        x: a.array.ts.map(ele =>ele),
        y: a.array.val.map(ele =>ele),
        mode: 'lines+points',
        name: a.sensor,
        line: {
          color: a.color,
          width: 2
        }

      }

      )
    }
    this.graph.layout = { autosize: true,  height: this.minHeight, title: this.chartType,
    margin: {
      l: 20,r:20,
    },
    marker: {color: 'red'} ,
    plot_bgcolor: 'rgba(0, 0, 0, 0)',
    paper_bgcolor: 'rgba(255,255,255,.3)',
    // fig_bgcolor :"red" //not works
  }
   
   this.fullData.push(this.graph.data)

   console.log(this.fullData)
  }
}
