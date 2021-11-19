import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  // chart starts

  basicData: any;

  multiAxisData: any;

  multiAxisOptions: any;

  lineStylesData: any;

  basicOptions: any;

  subscription: Subscription;
  plotlyData:any={}
  constructor(private ApiService: ApiService) { }

  ngOnInit(): void {
    this.loadCharts()
    this.loadChartByType()
  }
 public loadChartByType(){
    let params: any = {}
    params.chartType = 'pressure';
    params.time_period = 'Last 3 Hours',
    // params.time_period = this.chartInterval,
      this.ApiService.getChartData(params).subscribe(response => {
        console.log(response)

// rearrange 
let arr1= []
response.forEach((element,i) => {
    

    element.array.forEach(element2 => {
        let item:any={}
    
        item.sensor= element.sensor
        item.date=element2.date
        item.values1=element2.values1
        arr1.push(item)
    });

    

    
});

console.log(JSON.stringify(arr1))


        this.plotlyData.pressureData;
        this.plotlyData.pressureData={}
        this.plotlyData.pressureData.xAxes=response.map(x=>{
          return x.sensor
          
        })
        // let params: any = {}
        // params.chartType = 'level';
        // this.ApiService.getChartData(params).subscribe(response2 => {
        //   console.log(response2)
        //   this.plotlyData.levelData;
        // this.plotlyData.levelData={}
        // this.plotlyData.levelData.xAxes=response.map(x=>{
        //   return x.sensor
          
        // })
        // //   this.dismissLoader()
        // })
      })
 }
  loadCharts(){
    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'First Dataset',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: '#42A5F5',
              tension: .4
          },
          {
              label: 'Second Dataset',
              data: [28, 48, 40, 19, 86, 27, 90],
              fill: false,
              borderColor: '#FFA726',
              tension: .4
          }
      ]
  };

  this.multiAxisData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
          label: 'Dataset 1',
          fill: false,
          borderColor: '#42A5F5',
          yAxisID: 'y',
          tension: .4,
          data: [65, 59, 80, 81, 56, 55, 10]
      }, {
          label: 'Dataset 2',
          fill: false,
          borderColor: '#00bb7e',
          yAxisID: 'y1',
          tension: .4,
          data: [28, 48, 40, 19, 86, 27, 90]
      }]
  };

  this.multiAxisOptions = {
      stacked: false,
      plugins: {
          legend: {
              labels: {
                  color: '#495057'
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          },
          y: {
              type: 'linear',
              display: true,
              position: 'left',
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          },
          y1: {
              type: 'linear',
              display: true,
              position: 'right',
              ticks: {
                  color: '#495057'
              },
              grid: {
                  drawOnChartArea: false,
                  color: '#ebedef'
              }
          }
      }
  };

  this.lineStylesData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'First Dataset',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              tension: .4,
              borderColor: '#42A5F5'
          },
          {
              label: 'Second Dataset',
              data: [28, 48, 40, 19, 86, 27, 90],
              fill: false,
              borderDash: [5, 5],
              tension: .4,
              borderColor: '#66BB6A'
          },
          {
              label: 'Third Dataset',
              data: [12, 51, 62, 33, 21, 62, 45],
              fill: true,
              borderColor: '#FFA726',
              tension: .4,
              backgroundColor: 'rgba(255,167,38,0.2)'
          }
      ]
  };
  this.updateChartOptions();

  }
  updateChartOptions() {
    // if (this.config.dark)
    //     this.applyDarkTheme();
    // else
        this.applyLightTheme();
}
applyLightTheme() {
  this.basicOptions = {
      plugins: {
          legend: {
              labels: {
                  color: '#495057'
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          },
          y: {
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          }
      }
  };

  this.multiAxisOptions = {
      stacked: false,
      plugins: {
          legend: {
              labels: {
                  color: '#495057'
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          },
          y: {
              type: 'linear',
              display: true,
              position: 'left',
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          },
          y1: {
              type: 'linear',
              display: true,
              position: 'right',
              ticks: {
                  color: '#495057'
              },
              grid: {
                  drawOnChartArea: false,
                  color: '#ebedef'
              }
          }
      }
  };
}

applyDarkTheme() {
  this.basicOptions = {
      plugins: {
          legend: {
              labels: {
                  color: '#ebedef'
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: '#ebedef'
              },
              grid: {
                  color: 'rgba(255,255,255,0.2)'
              }
          },
          y: {
              ticks: {
                  color: '#ebedef'
              },
              grid: {
                  color: 'rgba(255,255,255,0.2)'
              }
          }
      }
  };

  this.multiAxisOptions = {
      stacked: false,
      plugins: {
          legend: {
              labels: {
                  color: '#ebedef'
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: '#ebedef'
              },
              grid: {
                  color: 'rgba(255,255,255,0.2)'
              }
          },
          y: {
              type: 'linear',
              display: true,
              position: 'left',
              ticks: {
                  color: '#ebedef'
              },
              grid: {
                  color: 'rgba(255,255,255,0.2)'
              }
          },
          y1: {
              type: 'linear',
              display: true,
              position: 'right',
              ticks: {
                  color: '#ebedef'
              },
              grid: {
                  drawOnChartArea: false,
                  color: 'rgba(255,255,255,0.2)'
              }
          }
      }
  };
}


public multiPlotly(){
    var trace1 = {
        x: [1, 2, 3, 4, 5],
        y: [1, 3, 2, 3, 1],
        mode: 'lines',
        name: 'Solid',
        line: {
          dash: 'solid',
          width: 4
        }
      };
      
      var trace2 = {
        x: [1, 2, 3, 4, 5],
        y: [6, 8, 7, 8, 6],
        mode: 'lines',
        name: 'dashdot',
        line: {
          dash: 'dashdot',
          width: 4
        }
      };
      
      var trace3 = {
        x: [1, 2, 3, 4, 5],
        y: [11, 13, 12, 13, 11],
        mode: 'lines',
        name: 'Solid',
        line: {
          dash: 'solid',
          width: 4
        }
      };
      
      var trace4 = {
        x: [1, 2, 3, 4, 5],
        y: [16, 18, 17, 18, 16],
        mode: 'lines',
        name: 'dot',
        line: {
          dash: 'dot',
          width: 4
        }
      };
      
      var data = [trace1, trace2, trace3, trace4];
      
      var layout = {
        title: 'Line Dash',
        xaxis: {
          range: [0.75, 5.25],
          autorange: false
        },
        yaxis: {
          range: [0, 18.5],
          autorange: false
        },
        legend: {
          y: 0.5,
          traceorder: 'reversed',
          font: {
            size: 16
          }
        }
      };
      
      Plotly.newPlot('myDiv', data, layout);
      
}
}
