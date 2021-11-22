import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../api.service';
import { Myclass, sensorId, classSensor, interfaceSensor, interfaceSensorList, interfaceEditAlert } from '../../myclass'
import { LoadingController } from '@ionic/angular';

import { LazyLoadEvent, SelectItem } from 'primeng/api';
// import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ModalController } from '@ionic/angular';
import { ManipulateAlertsPage } from '../manipulate-alerts/manipulate-alerts.page'

@Component({
  selector: 'app-manage-alerts',
  templateUrl: './manage-alerts.page.html',
  styleUrls: ['./manage-alerts.page.scss'],
  providers: [MessageService]
})
export class ManageAlertsPage implements OnInit {
  @Input() alertList: boolean;
  arr = []
  Subscription: Subscription;

  constructor(private loadingController:LoadingController,private ApiService: ApiService, private fb: FormBuilder, private messageService: MessageService,
    public modalController: ModalController
  ) { 
    console.log(window.innerHeight)
  }


loading;
  myClass = new Myclass();
  sortKey: string;
  // list = []
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
    status:['']
  });
  itemHeight=window.innerHeight

  ngOnInit(): void {
    // for (let a = 0; a < 33; a++) {

    //   this.myClass.data.push({ "alertid": a+1, "sensorid": a+1, "operator": "lessthan", "values1": 15696, "name": "krmk", "phoneno": "99623691114", "modified_date": "2021-11-08T08:31:51.000Z", "status": true, "lastmodified": null }
    //   )
    // }
    // this.sortOptions = [
    //   { label: 'Newest First', value: '!year' },
    //   { label: 'Oldest First', value: 'year' }
    // ];
    // get All alerts
    

  }
  ionViewWillEnter(){
    this.getSensorAlerts()
  }
  getSensorAlerts() {
    // this.simpleLoader()
    this.presentLoading()
    //  console.log(this.alertList)
    this.Subscription=this.ApiService.getAlertList({}).subscribe(response => {
      if(response && response.length>0){
      this.myClass.data = response.map(res=>{
        let index=this.myClass.operatorList.findIndex(a=> {return a.value==res.operator})
        // console.log(index)
        res.newOperator=  this.myClass.operatorList[index]?this.myClass.operatorList[index].key:'';
        return res;
      });
      console.log(this.myClass.data)
      this.alertList = false;
      }
      this.dismissLoader()
      // const { role, data } = this.loading.onDidDismiss();
    })
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
      id: sensor.alertid,
      status:sensor.status
    })
    this.display = true;
    // console.log(this.newForm)
    this.presentModal()

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
    this.presentModal()
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
  async presentModal() {
    const modal = await this.modalController.create({
      component: ManipulateAlertsPage,
      cssClass: 'my-custom-class',
      componentProps: {
        parentsensor: this.newForm,
        modeType:this.addTab
      }
    });
    return await modal.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await this.loading.present();

    // const { role, data } = await this.loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

    // Simple loader
    simpleLoader() {
      this.loading=this.loadingController.create({
        message: 'Loading...'
      }).then((response) => {
        response.present();
      });
    }
    // Dismiss loader
    dismissLoader() {
      this.loadingController.dismiss().then((response) => {
        console.log('Loader closed!', response);
        this.loading.onDidDismiss()
      }).catch((err) => {
        console.log('Error occured : ', err);
      });
    }
    ionViewWillLeave(){
      console.log('left')
      this.Subscription.unsubscribe()
      // this.interVal.unsubscribe()
    }

}
