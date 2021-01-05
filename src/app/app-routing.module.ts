import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarksComponent } from './components/marks/marks.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    canActivate: [],
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
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
