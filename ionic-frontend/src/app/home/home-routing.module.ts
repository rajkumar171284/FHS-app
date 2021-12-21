import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import {DiagramComponent} from './diagram/diagram.component';
const routes: Routes = [

  {
    path: 'tabs',
    component: HomePage,
    children: [
      {
        path: 'mimic',
        component: DiagramComponent
      },
      {
        path: 'manage-alerts',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/manage-alerts/manage-alerts.module').then(m => m.ManageAlertsPageModule)
          }
        ]

      },
      {
        path: 'charts',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/charts/charts-routing.module').then(m => m.ChartsPageRoutingModule)
          }
        ]

      }
    ]
  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
