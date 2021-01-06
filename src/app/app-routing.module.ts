import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarksComponent } from './components/marks/marks.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { AddUserComponent } from './components/add-user/add-user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
    canActivate: [],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'marks',
    component: MarksComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'add-student',
    component: AddUserComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService],
  },
  {
    path: '**',
    redirectTo: 'tasks',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
