import { Component, OnInit, OnChanges, SimpleChanges, Input, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { InterfacePlotlyPattern1, ClassPlotlyPattern1 } from '../myclass'
declare var Plotly: any;

@Component({
  selector: 'app-plotlyjs',
  templateUrl: './plotlyjs.component.html',
  styleUrls: ['./plotlyjs.component.scss'],
})
export class PlotlyjsComponent implements OnInit, OnChanges {
  @Input() plotlyData;
  @Input() chartType;
  @Input() graphType;
  @ViewChild('pressureId') pressureId: ElementRef;
  public data: any;
  public layout: any;
  // public data2: any;
  // public layout2: any;
  public graph = new ClassPlotlyPattern1();
  pie_chart;
  /* The plot target container. */
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {

    console.log(this.chartType, 'plotlyData chng', changes)
    if (this.plotlyData && this.chartType == 'pressure') {
      console.log(this.plotlyData.pressureData)
      console.log(this.plotlyData)
      // this.showPlot(this.plotlyData);
      // this.showPlot( this.plotlyData.pressureData);
      //  call multi
      this.multiPlot(this.plotlyData.pressureData)
    }



    // if (changes && changes.data && changes.data.previousValue) {
    //   this.initPlot();
    // }

    // if (changes && changes.layout && changes.layout.previousValue) {
    //   this.initPlot();
    // }
  }

  private showPieChart(value) {
    this.pie_chart = {
      'data': [{
        'labels': ['V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9'],
        'values': [55, 22, 31, 32, 33, 45, 44, 42, 12, 67],
        'type': 'pie',
        'sort': false,
      }],

      'layout': {
        paper_bgcolor: "rgba(0,0,0,0)",
        width: 320,
      }

    }

    Plotly.newPlot('plot2', this.pie_chart.data, this.pie_chart.layout);


  }

  private showPlot(changes) {
    console.log('plotlyData', changes.pressureData)
    let xAxes = changes.pressureData.map(a => {
      return parseInt(a)
    })
    console.log(xAxes)

    // var trace1 = {
    //   x: [0, 1, 2, 3, 4, 5],
    //   y: [1.5, 1, 1.3, 0.7, 0.8, 0.9],
    //   type: 'bar'
    // };

    // // var trace2 = {
    // //   x: [0, 1, 2, 3, 4, 5],
    // //   y: [1, 0.5, 0.7, -1.2, 0.3, 0.4],
    // //   type: 'bar'
    // // };

    // // var data = [trace1, trace2];
    // // let arr=changes;
    // // console.log(arr.length)
    // // this.plotlyData.response.map(a=>{

    // // })
    //     //  this.graph.data[0].x=this.plotlyData.response.map(a=>a.zone)
    // var data = [trace1];
    // Plotly.newPlot('plc', data);
    this.graph = {
      data: [
        //   { x: [1, 2, 3], y: [2, 6, 3], type: 'line'
        //   , mode: 'lines+points', marker: {color: 'red'} 
        // },
        { x: [1, 2, 3], y: [2, 5, 3], type: this.graphType },
      ],
      layout: { width: 420, height: 340, title: this.chartType }
    };

  }


  public multiPlot(pressureData) {
    this.graph.data = []
    for (let a of pressureData) {
      this.graph.data.push({
        x: a.array.map(ele => {
          return ele.date
        }),
        y: a.array.map(ele => {
          if (ele.values1) {
            return ele.values1;
          }
        }),
        mode: 'lines+points',
        name: a.sensor,
        line: {
          color: 'rgb(55, 128, 191)',
          width: 1
        }

      }

      )
    }
    this.graph.layout = { width: 300, height: 340, title: this.chartType }
    console.log(this.graph)
    // return;
    // var trace1 = {
    //   x: [1, 2, 3, 4],
    //   y: [10, 15, 13, 17],
    //   type: 'scatter'
    // };

    // var trace2 = {
    //   x: [1, 2, 3, 4],
    //   y: [16, 5, 11, 9],
    //   type: 'scatter'
    // };

    // var data = [trace1, trace2];
    // // Plotly.newPlot(this.pressureId.nativeElement, data);
    // this.graph = {
    //   data: [
    //     //   { x: [1, 2, 3], y: [2, 6, 3], type: 'line'
    //     //   , mode: 'lines+points', marker: {color: 'red'} 
    //     // },
    //       { x:  [1, 2,  3], y: [2, 5, 3], type:  this.graphType },
    //   ],
    //   layout: {width: 420, height: 340, title: this.chartType}
    // };
  }

}
