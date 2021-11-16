import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../api.service';
import { Myclass, sensorId, classSensor, interfaceSensor, interfaceSensorList, interfaceEditAlert } from '../../myclass'

import { LazyLoadEvent, SelectItem } from 'primeng/api';
// import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FormsModule, FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ModalController,ToastController  } from '@ionic/angular';

@Component({
  selector: 'app-manipulate-alerts',
  templateUrl: './manipulate-alerts.page.html',
  styleUrls: ['./manipulate-alerts.page.scss'],  providers:[MessageService]

})
export class ManipulateAlertsPage implements OnInit {
  @Input() parentsensor:any;
  @Input() modeType:any;
  constructor(private ApiService: ApiService, private fb: FormBuilder, private messageService: MessageService,
    public modalController: ModalController,public toastController: ToastController
    ) { }
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
  isActive: boolean = true;
  isInactive: boolean = false;
  newForm = this.fb.group({
    id: [''],
    sensorID: ['', Validators.required],
    operator: ['', Validators.required],
    value: ['', Validators.required],
    person_name: ['', Validators.required], phoneNO: ['', Validators.required],
  });


  ngOnInit() {
    this.newForm=this.parentsensor;
  console.log(this.myClass,this.modeType)
  
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
      // edit- modeType false
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
      params.status=this.newForm.get('status').value;//static as per API
      console.log(params)
      this.ApiService.editSensorAlert(params).subscribe(res => {
        // console.log(res)
        this.addSingle('success', res)
        this.myClass.screenLoader = false;

        this.dismiss()
      }, (error) => {
        // console.log(error)
        this.addSingle('warning', 'Something went wrong..')
        this.myClass.screenLoader = false;

      })

    }
  }
  addSingle(severity, msg) {
    this.messageService.add({ severity: severity, summary: 'Info', detail: msg });
    this.presentToast(msg)
  }
  onChangeHandler(event){
    console.log(this.newForm)
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }


}
