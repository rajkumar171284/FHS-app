import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {HttpClientModule,HttpClient} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DiagramComponent } from './home/diagram/diagram.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

import {comComponentsModule} from './comComponetsModule';

import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
PlotlyModule.plotlyjs = PlotlyJS;
@NgModule({
  declarations: [AppComponent,DiagramComponent],
  entryComponents: [],
  imports: [BrowserModule,CommonModule, IonicModule.forRoot(),
     AppRoutingModule,FormsModule,HttpClientModule,ReactiveFormsModule,
     BrowserAnimationsModule,DialogModule,comComponentsModule
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },HttpClient,PhotoViewer],
  bootstrap: [AppComponent],
  exports:[]
})
export class AppModule {}
