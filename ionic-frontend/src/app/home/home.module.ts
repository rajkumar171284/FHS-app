import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {DashboardComponent} from './dashboard/dashboard.component';
// import { LoginComponent } from './login/login.component';
import { DiagramComponent } from '../home/diagram/diagram.component';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,ReactiveFormsModule,
    HomePageRoutingModule,DialogModule
  ],
  declarations: [HomePage,DashboardComponent]
})
export class HomePageModule {}
