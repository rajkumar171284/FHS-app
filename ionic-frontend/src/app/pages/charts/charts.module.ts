import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChartsPageRoutingModule } from './charts-routing.module';
import * as PlotlyJS from 'plotly.js-dist-min';
import {comComponentsModule} from '../../comComponetsModule';

import { ChartsPage } from './charts.page';
import {PlotlyjsComponent} from '../../plotlyjs/plotlyjs.component';
import { PlotlyModule } from 'angular-plotly.js';
PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  imports: [
    comComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,PlotlyModule,
    ChartsPageRoutingModule
  ],
  declarations: [ChartsPage,PlotlyjsComponent]
})
export class ChartsPageModule {}
