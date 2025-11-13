import { Routes } from '@angular/router';
import { HomePage } from './shared/components/pages/home/home-page';

export const routes: Routes = [
  {
    path: "home",
    component: HomePage,
  },
  {
    path: "**",
    redirectTo: "/home",
  }
];
