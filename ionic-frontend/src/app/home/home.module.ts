import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {DashboardComponent} from './dashboard/dashboard.component';
import { DialogModule } from 'primeng/dialog';
import {comComponentsModule} from '../comComponetsModule';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,ReactiveFormsModule,
    HomePageRoutingModule,DialogModule,comComponentsModule
  ],
  declarations: [HomePage,DashboardComponent,]
})
export class HomePageModule {}
