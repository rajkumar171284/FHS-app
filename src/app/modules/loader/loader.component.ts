import { Component, OnInit ,Input,ElementRef,OnChanges} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit,OnChanges {

  @Input('isLoader')isLoader;
  constructor() {
    console.log('isLoader',this.isLoader)
   }

   ngOnChanges(){
    console.log('isLoader',this.isLoader)

   }
  ngOnInit() {}

}
