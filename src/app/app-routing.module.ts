import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarksComponent } from './components/marks/marks.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ExecuteTaskComponent } from './components/execute-task/execute-task.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { CreateEtalonComponent } from './components/create-etalon/create-etalon.component';

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
    path: 'add-task',
    component: AddTaskComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService],
  },
  {
    path: 'execute-task/:taskId',
    component: ExecuteTaskComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'create-etalon/:taskId',
    component: CreateEtalonComponent,
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
