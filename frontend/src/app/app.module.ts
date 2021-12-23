import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StartupComponent } from './modules/startup/startup.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FilesComponent } from './modules/files/files.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ProgressBarModule } from 'primeng/progressbar';

import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { GMapModule } from 'primeng/gmap';
import { TabMenuModule } from 'primeng/tabmenu';
import { InputTextModule } from 'primeng/inputtext';
import { ChartModule } from 'primeng/chart';
import { PlotComponent } from './modules/plot/plot.component';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { LoaderComponent } from './modules/loader/loader.component';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoginComponent } from './modules/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { TableModule } from 'primeng/table';
import { SensorAlertComponent } from './modules/sensor-alert/sensor-alert.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsComponent } from './modules/charts/charts.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
// import {SkeletonModule} from 'primeng/skeleton';


PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    StartupComponent,
    FilesComponent,
    PlotComponent,
    LoaderComponent,
    LoginComponent,
    DashboardComponent,
    SensorAlertComponent,
    ChartsComponent
  ],
  imports: [HttpClientModule, ToastModule,
    BrowserModule, OverlayPanelModule,
    AppRoutingModule, ScrollingModule, ReactiveFormsModule, ProgressBarModule,
    BrowserAnimationsModule, TabMenuModule, InputTextModule, GMapModule, VirtualScrollerModule,
    ChartModule, PlotlyModule, DialogModule, ProgressSpinnerModule, FormsModule, TableModule
  ],
  providers: [HttpClient, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
