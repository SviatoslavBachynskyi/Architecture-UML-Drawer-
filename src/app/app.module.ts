import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import * as PlotlyJS from 'plotly.js/dist/plotly.js';

import { PlotlyModule } from 'angular-plotly.js';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { HeaderComponent } from './components/header/header.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { MarksComponent } from './components/marks/marks.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './materials.module';
import { TaskComponent } from './components/tasks/task/task.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { LoginComponent } from './components/login/login.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ExecuteTaskComponent } from './components/execute-task/execute-task.component';
import { TaskPreviewComponent } from './modals/task-preview/task-preview.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { CreateEtalonComponent } from './components/create-etalon/create-etalon.component';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TasksComponent,
    MarksComponent,
    StatisticsComponent,
    TaskComponent,
    PageTitleComponent,
    LoginComponent,
    AddUserComponent,
    ExecuteTaskComponent,
    TaskPreviewComponent,
    AddTaskComponent,
    CreateEtalonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
    NgbModule,
    CommonModule,
    PlotlyModule,
    ReactiveFormsModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
