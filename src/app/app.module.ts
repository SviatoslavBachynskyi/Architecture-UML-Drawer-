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
import { PageTitleComponent } from './page-title/page-title.component';
import { LoginComponent } from './components/login/login.component';

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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
