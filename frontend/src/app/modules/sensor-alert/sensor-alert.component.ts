import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../api.service';
import { Myclass, sensorId, classSensor, interfaceSensor } from '../../myclass'
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sensor-alert',
  templateUrl: './sensor-alert.component.html',
  styleUrls: ['./sensor-alert.component.css']
})
export class SensorAlertComponent implements OnInit {
  @Input() alertList: boolean;
  constructor(private ApiService: ApiService) { }
  myClass = new Myclass();
  sortKey: string;
  list = []
  sortOptions: SelectItem[];
  display: boolean = false;
  newSensor: interfaceSensor = new classSensor();
  objectKeys = Object.keys;
  objectValues = Object.values;
data1;
  newLabel: any = []
  newValues: any = []

  newForm = new FormGroup({
    sensorID: new FormControl('',Validators.required),
    operator: new FormControl('',Validators.required),
    value: new FormControl('',Validators.required),
    name: new FormControl('',Validators.required),
  });


  ngOnInit(): void {
    this.sortOptions = [
      { label: 'Newest First', value: '!year' },
      { label: 'Oldest First', value: 'year' }
    ];
    console.log(Object.keys(this.newSensor))
    this.newLabel = Object.keys(this.newSensor)
    this.newValues = Object.values(this.newSensor)
    // get All alerts
    this.getSensorAlerts()

  }
  getSensorAlerts() {
    //  console.log(this.alertList)
    this.ApiService.getAlertList({}).subscribe(respone => {
      this.myClass.data = respone;
      this.alertList = false;
    })

    //     this.myClass.data= Array.from({length: 10000}).map(() => this.ApiService.getAlertList({}));
    console.log(this.myClass.data)
  }
  onSortChange() {
    if (this.sortKey.indexOf('!') === 0)
      this.sort(-1);
    else
      this.sort(1);
  }

  sort(order: number): void {
    let list = [...this.list];
    list.sort((data1, data2) => {
      let value1 = data1.year;
      let value2 = data2.year;
      let result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (order * result);
    });

    this.list = list;
  }

  saveForm(type: any) {
    console.log(this.newValues,this.data1,this.newForm)

    if (type == 'add' && this.newForm.valid) {
console.log(this.newValues,this.data1,this.newForm)


this.myClass.screenLoader=true;
this.ApiService.addSensorAlert(this.newForm).subscribe(res=>{
  console.log(res)
})

    }
  }
}
