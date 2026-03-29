import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page.component';
import { RegisterPageComponent } from './pages/register-page.component';
import { DashboardPageComponent } from './pages/dashboard-page.component';
import { DogsPageComponent } from './pages/dogs-page.component';
import { AdminDogsPageComponent } from './pages/admin-dogs-page.component';
import { AdminApplicationsPageComponent } from './pages/admin-applications-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'dogs', component: DogsPageComponent },
  { path: 'admin/dogs', component: AdminDogsPageComponent },
  { path: 'admin/applications', component: AdminApplicationsPageComponent },
  { path: '**', redirectTo: 'dashboard' }
];
