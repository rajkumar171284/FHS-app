import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../api.service';
import { Myclass, sensorId, classSensor, interfaceSensor, interfaceSensorList, interfaceEditAlert } from '../../myclass'
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule, FormBuilder } from '@angular/forms';
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
  addTab: boolean = true;
  newForm = this.fb.group({
    id: [''],
    sensorID: ['', Validators.required],
    operator: ['', Validators.required],
    value: ['', Validators.required],
    person_name: ['', Validators.required], phoneNO: ['', Validators.required],
  });


  ngOnInit(): void {
    for (let a = 0; a < 33; a++) {

      //   this.myClass.data.push({
      //     "sensorid":"502",
      //     "operator":"lessthan",
      //     "value":2.2,
      //     "name":"krmk",
      //     "phoneNO":"9884000157"
      // })
    }
    this.sortOptions = [
      { label: 'Newest First', value: '!year' },
      { label: 'Oldest First', value: 'year' }
    ];
    // console.log(Object.keys(this.newSensor))
    // this.newLabel = Object.keys(this.newSensor)
    // this.newValues = Object.values(this.newSensor)
    // get All alerts
    this.getSensorAlerts()

  }
  getSensorAlerts() {
    //  console.log(this.alertList)
    this.ApiService.getAlertList({}).subscribe(respone => {
      this.myClass.data = respone;
      console.log(this.myClass.data)
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
  edit(sensor) {
    console.log(sensor.alertid)
    this.addTab = false;
    let opt = this.myClass.operatorList.filter(x => x.value.toLocaleLowerCase() == sensor.operator.toLocaleLowerCase())
    // update details in formgroup
    this.newForm.patchValue({
      sensorID: sensor.sensorid,
      operator: opt[0].value,
      value: sensor.values1 ? sensor.values1 : sensor.value,
      person_name: sensor.name,
      phoneNO: sensor.phoneno,
      id: sensor.alertid
    })
    this.display = true;
    console.log(this.newForm)
  }
  saveForm(type: any) {
    console.log(type, this.newForm)
    let msg: any;
    if (type == 'add') {
      if (!this.newForm.valid) {
        this.addSingle('error', 'All fields are mandatory..');
        return;
      }
      // console.log(this.newValues, this.data1, this.newForm)


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
        this.addSingle('success', res)
        this.myClass.screenLoader = false;


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
      params.status=true;//static as per API
      console.log(params)
      this.ApiService.editSensorAlert(params).subscribe(res => {
        console.log(res)
        this.addSingle('success', res)
        this.myClass.screenLoader = false;

        this.getSensorAlerts()
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
