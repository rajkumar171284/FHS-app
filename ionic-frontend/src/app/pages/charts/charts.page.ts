import { Component, OnInit } from '@angular/core';
import { Myclass, sensorId, classSensor, interfaceSensor, interfaceSensorList, interfaceEditAlert } from '../../myclass'
import { LoadingController } from '@ionic/angular';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.page.html',
  styleUrls: ['./charts.page.scss'],
})
export class ChartsPage implements OnInit {
  myClass = new Myclass();
  chartFilters = [];
  chartInterval;
  loading;
  plotlyData:any={}
  constructor(private loadingController: LoadingController, private ApiService: ApiService) {
    this.chartFilters = this.myClass.chartFilters.map(item => {
      return {
        key: item, value: item

      }
    })

    // initiate 
    this.chartInterval = this.chartFilters[0].value

  }

  ngOnInit() {
    this.loadChart()
  }
  loadChart() {

    this.loadingController.create({
      message: ''
    }).then((response) => {
      this.loading = response;
      this.loading.present();
      let params: any = {}
      params.chartType = 'pressure';
      params.time_period = this.chartInterval,
        this.ApiService.getChartData(params).subscribe(response => {
          console.log(response)
          this.plotlyData.pressureData;
          this.plotlyData.pressureData=response.map(x=>{
            return x;
          })
          let params: any = {}
          params.chartType = 'level';
          this.ApiService.getChartData(params).subscribe(response2 => {
            console.log(response2)
            this.plotlyData.levelData;
          this.plotlyData.levelData=response.map(x=>{
            return x;            
          })
            this.dismissLoader()
          })
        })
    }
    )
  }
  setInt(e) {
    console.log(e, this.chartInterval)
  }
  // Dismiss loader
  dismissLoader() {
    this.loadingController.dismiss().then((response) => {
      console.log('Loader closed!', response);
    }).catch((err) => {
      console.log('Error occured : ', err);
    });
  }
}
