import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageAlertsPageRoutingModule } from './manage-alerts-routing.module';

import { ManageAlertsPage } from './manage-alerts.page';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageAlertsPageRoutingModule,
    DialogModule,ReactiveFormsModule
  ],
  declarations: [ManageAlertsPage]
})
export class ManageAlertsPageModule {}
