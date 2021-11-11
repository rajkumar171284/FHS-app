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


@NgModule({
  declarations: [AppComponent,DiagramComponent],
  entryComponents: [],
  imports: [BrowserModule,CommonModule, IonicModule.forRoot(),
     AppRoutingModule,FormsModule,HttpClientModule,ReactiveFormsModule,
     BrowserAnimationsModule,DialogModule
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
