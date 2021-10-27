import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';import * as PlotlyJS from 'plotly.js-dist-min';
import { Subscription } from 'rxjs';
declare const Plotly: any;
import {InterfacePlotlyPattern1,ClassPlotlyPattern1} from '../../myclass';

@Component({
  selector: 'app-plotly-pie',
  templateUrl: './plotly-pie.component.html',
  styleUrls: ['./plotly-pie.component.css']
})
export class PlotlyPieComponent implements OnInit {
  @Input() plotlyData:any={}; 
  @Input() chartType: string;
  public data: any;
  public layout: any;
  // public data2: any;
  // public layout2: any;
  graph:any={};
  // graph = new ClassPlotlyPattern1();
// pie_chart;
/* The plot target container. */
@ViewChild('plotContainer') plotContainer: ElementRef;
  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    // this.initPlot();

  }
ngOnChanges(changes: SimpleChanges) {
  console.log(this.chartType, 'plotlyData chng',changes)
  

  if (changes && changes.currentValue && this.chartType=='bar') {
    this.graph = {
      data: [
          { x: [1, 2, 3], y: [2, 6, 3], type: 'bar'
          , mode: 'lines+points', marker: {color: 'red'} },
          // { x: [1, 2, 3], y: [2, 5, 3], type: 'bar' },
      ],
      layout: {width: 320, height: 240, title: 'A Fancy Plot'}
  };
    // this.showPieChart(changes)
  }

  // if (changes && changes.data && changes.data.previousValue) {
  //   this.initPlot();
  // }

  // if (changes && changes.layout && changes.layout.previousValue) {
  //   this.initPlot();
  // }
}

// private showPieChart(value){
//   this.pie_chart = {
//   'data': [{
//     'labels': ['V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9'],
//     'values': [55, 22, 31, 32, 33, 45, 44, 42, 12, 67],
//     'type': 'pie',
//     'sort': false,
//   }],

//   'layout': {
//     paper_bgcolor: "rgba(0,0,0,0)",
//     width: 320,
//   }

// }

// Plotly.newPlot('plot2', this.pie_chart.data, this.pie_chart.layout);


// }


private initPlot() {

    // this.getTheme();

    // the layout.
    // this.layout = {
    //   autosize: true,
    //   height: 500,
    //   legend: { orientation: "h", x: 0, y: -0.1 },
    //   margin: { l: 10, r: 10, b: 290, t: 70, pad: 0 },
    //   showlegend: true,

    //   title: { text: "Alarm Trend Of Process" },
    //   xaxis: {
    //     anchor: "y",
    //     autorange: true,
    //     domain: (2)[0.05, 1],
    //     dtick: 15000 * 60 * 1000, //TEST interval
    //     range: (2)["2019-02-21 13:37:13.3223", "2019-04-22 10:22:46.6777"],
    //     showgrid: false,
    //     showticklabels: true,
    //     zeroline: false,
    //     tick0: 0,
    //     tickformat: "%H:%M",
    //     title: {
    //       font: { size: 13, color: "#cccccc" }
    //     },
    //     type: "date",
    //     zeroline: false,
    //     title: 'demo',
    //     side: 'right',
    //     linecolor: '#FFF',
    //     linewidth: 50
    //   },
    //   yaxis: {
    //     title: 'Demo',
    //     anchor: "x",
    //     autorange: true,
    //     domain: (2)[0.6, 1],
    //     dtick: 50,
    //     range: (2)[-0.18038237738985866, 2.1803823773898587],
    //     showgrid: false,
    //     showticklabels: true,
    //     tick0: 0,
    //     type: "linear",
    //     zeroline: true,
    //     zerolinecolor: "#bdbdbd"
    //   }
    // }

    // the data.
    this.data = [
      {
        x: ["2019-02-25 00:00:00", "2019-02-26 00:00:00", "2019-03-25 00:00:00", "2019-04-19 00:00:00"],
        y: [1, 0, 1, 0],
        type: 'scatter',
        fill: "none",
        mode: "lines+markers",
        line: { shape: 'linear', width: 1 },
        name: "Emergency",
        hovermode: 'closest',
        hoverlabel: { namelength: -1 },
        xaxis: 'x',
        yaxis: 'y'
      },
      {
        x: ["2019-02-25 00:00:00", "2019-02-26 00:00:00", "2019-03-25 00:00:00", "2019-04-19 00:00:00"],
        y: [1, 1, 2, 0],
        type: 'scatter',
        fill: "none",
        mode: "lines+markers",
        line: { shape: 'linear', width: 1 },
        name: "Major",
        xaxis: 'x',
        yaxis: 'y'
      },
      {
        x: ["2019-02-25 00:00:00", "2019-02-26 00:00:00", "2019-03-25 00:00:00", "2019-04-19 00:00:00"],
        y: [0, 0, 0, 1],
        type: 'scatter',
        fill: "none",
        mode: "lines+markers",
        line: { shape: 'linear', width: 1 },
        name: "Critical",
        xaxis: 'x',
        yaxis: 'y'
      }
    ]

    if (this.data !== undefined && this.layout) {
      Plotly.newPlot(this.plotContainer.nativeElement, this.data, this.layout, { staticPlot: false });
    } else {
      console.warn('The data or the layout are not defined');
    }

  }
  /** On resize this method triggers & resize the plot. */
  public onResize() {
    Plotly.Plots.resize(this.plotContainer.nativeElement);
  }
  ngOnDestroy() {
    // if (this._theme$) { this._theme$.unsubscribe(); }
  }

}
