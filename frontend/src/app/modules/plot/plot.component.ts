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
  /* The plot target container. */
  constructor() { }
  

  ngOnInit() {
  }
  // ngAfterViewInit(){
  //   // if (this.plotlyData && this.plotlyData.pressureData && this.chartType == 'pressure') {
  //   //   console.log(this.plotlyData.pressureData)
  //   //   console.log(this.plotlyData)
  //   //   // this.showPlot(this.plotlyData);
  //   //   // this.showPlot( this.plotlyData.pressureData);
  //   //   //  call multi
  //   //   this.multiPlot(this.plotlyData.pressureData)
  //   // }    
  // }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  this.minHeight=window.innerHeight-391
    // if (this.plotlyData && this.plotlyData.pressureData && this.chartType == 'pressure') {
      console.log(this.plotlyData.pressureData)
      console.log(this.plotlyData)
      //  call multi
      this.multiPlot(this.plotlyData.pressureData)
    
  }



  public multiPlot(pressureData) {
    this.graph.data = []
    for (let a of pressureData) {
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
      l: 30,r:30, plot_bgcolor: '#c0d6e4',
      paper_bgcolor: '#7f7f7f',

    },
    marker: {color: 'red'} 
  
  }
   console.log(this.graph)
  }

}
