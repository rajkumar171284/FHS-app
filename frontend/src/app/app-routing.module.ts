import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './modules/map/map.component';
import { StartupComponent } from './modules/startup/startup.component';
import { FilesComponent } from './modules/files/files.component';
import { PlotComponent } from './modules/plot/plot.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

import { LoginComponent } from './modules/login/login.component';
import { AuthGuard } from './modules/auth.guard';
const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard]
  },
  {
    path: 'home', component: StartupComponent,canActivate:[AuthGuard]
  },
  {
    path: 'start', component: MapComponent,canActivate:[AuthGuard]
  },
  {
    path: 'csv', component: FilesComponent,canActivate:[AuthGuard]
  },
  {
    path: 'plot', component: PlotComponent,canActivate:[AuthGuard]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
