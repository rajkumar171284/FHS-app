import { Component, OnInit } from '@angular/core';
import { Myclass, sensorId, classSensor, interfaceSensor, interfaceSensorList, interfaceEditAlert } from '../../myclass'
import { LoadingController } from '@ionic/angular';
import { ApiService } from '../../api.service';
class newArr{
  pressureData='';levelData=''

}
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
  plotlyData:any=new newArr()
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
  }
  ionViewWillEnter(){
    this.loadChart()

  }
  loadChart() {
    this.plotlyData=new newArr();
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
          this.dismissLoader()
          let newResponse=Object.keys(response).map((x,i)=>{
            let str;
            if(i==0){
              str='#e40000'
            }         
            if(i==1){
              str='green'
            }         
            if(i==2){
              str='blue'
            }         
            if(i==3){
              str='orange'
            }         
            if(i==4){
              str='yellow'
            }   
                
            if(i==5){
              str='black'
            }         
            if(i==6){
              str='#cc0080'
            }         
            if(i==7){
              str='#762987'
            }
            return {
              sensor:x,
              array:Object.values(response)[i],
              color:str
            }
          })

          
          this.plotlyData.pressureData=newResponse.map(x=>{
            return x;
          })
          
          params.chartType = 'level';
          this.ApiService.getChartData(params).subscribe(response2 => {
            // console.log(response2)
            this.plotlyData.levelData=Object.keys(response2).map((x,i)=>{
              let str;
                str='#e40000'
                
              return {
                sensor:x,
                array:Object.values(response2)[i],
                color:str
              }
            })
  
            
            // this.plotlyData.levelData=newResponse.map(x=>{
            //   return x;
            // })
            this.dismissLoader()
          })
        })
    }
    )
  }
  setInt(e) {
    console.log(e, this.chartInterval)
    this.loadChart()
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
