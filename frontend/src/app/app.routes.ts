import { Routes } from '@angular/router';
import { Home } from './shared/components/pages/home/home';

export const routes: Routes = [
  {
    path: "home",
    component: Home,
  },
  {
    path: "**",
    redirectTo: "/home",
  }
];
