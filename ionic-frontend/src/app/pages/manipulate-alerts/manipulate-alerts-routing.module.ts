import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManipulateAlertsPage } from './manipulate-alerts.page';

const routes: Routes = [
  {
    path: '',
    component: ManipulateAlertsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManipulateAlertsPageRoutingModule {}
