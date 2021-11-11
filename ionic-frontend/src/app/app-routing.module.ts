import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './home/dashboard/dashboard.component'
import {MenuComponent} from './home/menu/menu.component';
import {DiagramComponent} from './home/diagram/diagram.component';
const routes: Routes = [
  {
    path: 'home',
    // component:LoginComponent
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)

  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  // {
  //   path:'dashboard',component:DashboardComponent
  // }
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
        path: 'export',
        component: DashboardComponent,
      }
    ]
  },
  
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'manipulate-alerts',
    loadChildren: () => import('./pages/manipulate-alerts/manipulate-alerts.module').then( m => m.ManipulateAlertsPageModule)
  },
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
