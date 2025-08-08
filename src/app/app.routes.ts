import { Routes } from '@angular/router';
import { AuthLayoutComponent } from '../app/shared/components/auth-layout/auth-layout.component'; // لازم تعمل ملف اللayout
import { CompanyInfoComponent } from './features/compnay/company-info/company-info.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent) },
      { path: 'confirm-otp', loadComponent: () => import('./features/auth/confirm-otp/confirm-otp.component').then(m => m.ConfirmOtpComponent) },
      { path: 'create-password', loadComponent: () => import('./features/auth/create-password/create-password.component').then(m => m.CreatePasswordComponent) },
      { path: 'company-info', component: CompanyInfoComponent }    
    ]
  },
  { path: '**', redirectTo: '' }
];

