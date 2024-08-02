import { Routes } from '@angular/router';
import { checkTokenGuard } from './shared/check-token.guard';
import { sendHomeGuard } from './shared/send-home.guard';

export const routes: Routes = [
  {
    path: '',
        // canActivate: [sendHomeGuard],
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'dashboard',
    canActivate: [checkTokenGuard],
    canActivateChild: [checkTokenGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./main/main-home/main-home.component').then(
            (m) => m.MainHomeComponent
          ),
      },
      {
        path: 'attendance',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./main/attendance/attendance.component').then(
                (m) => m.AttendanceComponent
              ),
          },
          {
            path: 'details',
            loadComponent: () =>
              import(
                './main/atten-details-emp/atten-details-emp.component'
              ).then((m) => m.AttenDetailsEmpComponent),
          },
        ],
      },
      {
        path: 'manage-employee',

        children: [
          {
            path: '',
            loadComponent: () =>
              import('./main/mangage-employee/mangage-employee.component').then(
                (m) => m.MangageEmployeeComponent
              ),
          },
          {
            path: 'add',
            loadComponent: () =>
              import('./main/add-employee/add-employee.component').then(
                (m) => m.AddEmployeeComponent
              ),
          },
          {
            path: 'view',
            loadComponent: () =>
              import('./main/view-employee/view-employee.component').then(
                (m) => m.ViewEmployeeComponent
              ),
          },
        ],
      },
      {
        path:"payslip",
        loadComponent:()=>import('./main/payslip-home/payslip-home.component').then(
         (m)=>m.PayslipHomeComponent 
        )
      }
    ],
    loadComponent: () =>
      import('./main/home/home.component').then((m) => m.HomeComponent),
  },
];
