import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageAlertsPage } from './manage-alerts.page';

const routes: Routes = [
  {
    path: '',
    component: ManageAlertsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageAlertsPageRoutingModule {}
