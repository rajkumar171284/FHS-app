import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../api.service';
import { Myclass, sensorId, classSensor, interfaceSensor, interfaceSensorList, interfaceEditAlert } from '../../myclass'
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sensor-alert',
  templateUrl: './sensor-alert.component.html',
  styleUrls: ['./sensor-alert.component.css'],
  providers: [MessageService]
})
export class SensorAlertComponent implements OnInit {
  @Input() alertList: boolean;
  constructor(private ApiService: ApiService, private fb: FormBuilder, private messageService: MessageService) { }
  myClass = new Myclass();
  modeType: boolean
  sortKey: string;
  list = []
  sortOptions: SelectItem[];
  display: boolean = false;
  newSensor: interfaceSensor = new classSensor();
  objectKeys = Object.keys;
  objectValues = Object.values;
  data1;
  addTab: boolean = true;
  setActive: boolean = true;
  setInActive: boolean = false;
  newForm = this.fb.group({
    id: [''],
    sensorID: ['', Validators.required],
    operator: ['', Validators.required],
    value: ['', Validators.required],
    person_name: ['', Validators.required], phoneNO: ['', Validators.required],
    status: ['']
  });

  setHeight;
  ngOnInit(): void {

    this.sortOptions = [
      { label: 'Newest First', value: '!year' },
      { label: 'Oldest First', value: 'year' }
    ];
    // get All alerts
    this.getSensorAlerts()

  }
  reloadAlert() {
    this.getSensorAlerts();
  }
  getSensorAlerts() {
    //  console.log(this.alertList)
    this.myClass.screenLoader = true;

    this.ApiService.getAlertList({}).subscribe(respone => {
      this.myClass.data = respone.map(obj => {
        obj.formattedOperated;
        let that = this;
        let newOpeartor = that.myClass.operatorList.filter(x => x.value.toLocaleLowerCase() == obj.operator.toLocaleLowerCase());
        obj.formattedOperated = newOpeartor[0] ? newOpeartor[0].icon : '';
        return obj;
      });

      // console.log(this.myClass.data)
      this.alertList = false;
      this.myClass.screenLoader = false;
    })


    //     this.myClass.data= Array.from({length: 10000}).map(() => this.ApiService.getAlertList({}));
    console.log(this.myClass.data)
  }
  // onSortChange() {
  //   if (this.sortKey.indexOf('!') === 0)
  //     this.sort(-1);
  //   else
  //     this.sort(1);
  // }

  // sort(order: number): void {
  //   let list = [...this.list];
  //   list.sort((data1, data2) => {
  //     let value1 = data1.year;
  //     let value2 = data2.year;
  //     let result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

  //     return (order * result);
  //   });

  //   this.list = list;
  // }
  deleteAlert(sensor) {
    this.myClass.screenLoader = true;

    this.ApiService.deleteAlert({id:sensor.alertid}).subscribe(res => {
      console.log(res)
     
      this.myClass.screenLoader = false;
      this.addSingle('success', res)
      let newInterval= setInterval(()=>{
        this.display = false;
        this.getSensorAlerts()
        clearInterval(newInterval);
      },1000);
      
    }, (error) => {
      console.log(error)
      this.addSingle('warning', 'Something went wrong..')
      this.myClass.screenLoader = false;

    })
  }
  edit(sensor) {
    console.log(sensor)
    this.addTab = false;//editing sensors
    let opt = this.myClass.operatorList.filter(x => x.value.toLocaleLowerCase() == sensor.operator.toLocaleLowerCase())
    // update details in formgroup
    this.newForm.patchValue({
      sensorID: sensor.sensorid,
      operator: opt[0].value,
      value: sensor.values1 ? sensor.values1 : sensor.value,
      person_name: sensor.name,
      phoneNO: sensor.phoneno,
      id: sensor.alertid,
      status: sensor.status
    })
    this.display = true;//open form
    console.log(this.newForm)
  }
  saveForm(type: any) {
    console.log(type, this.newForm)
    let msg: any;
    if (type == 'add') {
      if (!this.newForm.valid) {
        this.addSingle('success', 'All fields are mandatory..');
        return;
      }


      this.myClass.screenLoader = true;
      let params: any = {}
      params.sensorID = this.newForm.get('sensorID').value;
      params.operator = this.newForm.get('operator').value;
      params.value = this.newForm.get('value').value;
      params.person_name = this.newForm.get('person_name').value;
      params.phoneNO = this.newForm.get('phoneNO').value;
      console.log(params)


      this.ApiService.addSensorAlert(params).subscribe(res => {
        console.log(res)

        this.myClass.screenLoader = false;
        this.addSingle('success', res);
        
        let newInterval= setInterval(()=>{
          this.display = false;
          this.getSensorAlerts()
          clearInterval(newInterval);
        },1000);
        
      }, (error) => {
        console.log(error)
      })

    } else {
      // edit
      if (!this.newForm.valid) {
        this.addSingle('error', 'All fields are mandatory..');
        return;
      }
      let params: any = {} //as interfaceEditAlert;
      params.id = this.newForm.get('id').value;
      params.sensorID = this.newForm.get('sensorID').value;
      params.operator = this.newForm.get('operator').value;
      params.value = this.newForm.get('value').value;
      params.person_name = this.newForm.get('person_name').value;
      params.phoneNO = this.newForm.get('phoneNO').value;
      params.status = this.newForm.get('status').value;//static as per API
      console.log(params)
      this.myClass.screenLoader = true;
      this.ApiService.editSensorAlert(params).subscribe(res => {
        console.log(res)
       
        this.myClass.screenLoader = false;
        this.addSingle('success', res)
        let newInterval= setInterval(()=>{
          this.display = false;
          this.getSensorAlerts()
          clearInterval(newInterval);
        },1000);
        
      }, (error) => {
        console.log(error)
        this.addSingle('warning', 'Something went wrong..')
        this.myClass.screenLoader = false;

      })

    }
  }
  addNew() {
    this.addTab = true;
    this.newForm.patchValue({
      sensorID: '',
      operator: '',
      value: '',
      person_name: '',
      phoneNO: ''
    })
    this.display = !this.display
  }

  addSingle(severity, msg) {
    this.messageService.add({ severity: severity, summary: 'Info', detail: msg });
  }

  // addMultiple() {
  //     this.messageService.addAll([{severity:'success', summary:'Service Message', detail:'Via MessageService'},
  //                                 {severity:'info', summary:'Info Message', detail:'Via MessageService'}]);
  // }

  clear() {
    this.messageService.clear();
  }

}
