import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { DiagramComponent } from '../home/diagram/diagram.component';
const routes: Routes = [

  {
    path: 'tabs',
    component: HomePage,
    children: [
      {
        path: 'mimic',
        component: DiagramComponent
        // loadChildren: () => import('../pages/mimic/mimic.module').then(m=>m.MimicPageModule)
        // children: [
        //   {
        //     path: '', loadChildren: () => import('../pages/mimic/mimic.module').then(m=>m.MimicPageModule)
        //   }
        // ]
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
    ]
  },
  
  // {
  //   path:'dashboard',component:DashboardComponent
  // },
  {
    path: 'menu',
    component: MenuComponent,
    //  canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DiagramComponent,
      },
      {
        path: 'managePanel',
        component: DashboardComponent,
      },
      {
        path: 'upload',
        component: DashboardComponent,
      },
      {
        path: 'export',
        component: DashboardComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
