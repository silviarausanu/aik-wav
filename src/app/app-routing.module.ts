import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetsComponent } from './pages/assets/assets.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DetailsComponent } from './pages/details/details.component';

const routes: Routes = [
  {
    path: 'assets',
    component: AssetsComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'details/:id',
    component: DetailsComponent
  },
  {
    path: '',
    redirectTo: '/assets',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
