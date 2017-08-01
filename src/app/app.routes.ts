import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';
import { CheckServerComponent } from './check/check-server.component';

export const ROUTES: Routes = [
  { path: '',      component: CheckServerComponent },
  { path: 'check', component: CheckServerComponent},
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: '**',    component: NoContentComponent },
];
