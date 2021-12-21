import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { FormsModule } from '@angular/forms';

import { HomePageRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,ReactiveFormsModule,FormsModule,
    HomePageRoutingModule,DialogModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
