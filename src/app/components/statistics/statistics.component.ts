import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { UserStatistics } from 'src/app/models/userStatistics.model';
import { StatsService } from 'src/app/services/stats.service';

const chartSize = 386;

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  userStats: UserStatistics = {
    averageCompletionTime: 0,
    averageMark: 0,
    tasksCompletedLastWeek: 0,
    taskNames: [],
    taskMarks: [],
    taskTimes: []
  };

  numOfTasksToShowOnChart = 5;

  taskMarksChart = {
    data: [
        { x: ['Завдання 1', 'Завдання 2', 'Завдання 3'], y: [9, 4, 6], type: 'bar', width: 0.667, marker: {color: '#3366cc'} }
    ],
    layout: { width: chartSize * 1.2, height: chartSize, title: 'Оцінки за завдання', barmode: 'relative',
      xaxis: { title: { text: 'Завдання' }},
      yaxis: { title: { text: 'Оцінка' }}
    },
    displayModeBar: false
  };

  taskTimeChart = {
    data: [
        { x: ['Завдання 1', 'Завдання 2', 'Завдання 3'], y: [15, 12, 13], type: 'bar', width: 0.667, marker: {color: '#3366cc'} }
    ],
    layout: { width: chartSize * 1.2, height: chartSize, title: 'Час виконання завдань',
      xaxis: { title: { text: 'Завдання' }},
      yaxis: { title: { text: 'Час виконання (хв)' }}
    }
  };

  plotConfig = {
    displayModeBar: false
  };

  constructor(private statsService: StatsService) {}

  get averageTimeFormatted(): string {
    return new Date(this.userStats.averageCompletionTime * 1000).toISOString().substr(11, 8);
  }

  ngOnInit(): void {
    this.statsService.getUserStatistics().subscribe(stats => {
      if (!stats) { return; }

      this.userStats = stats;

      this.updateMarksChart(stats.taskNames.slice(-this.numOfTasksToShowOnChart), stats.taskMarks.slice(-this.numOfTasksToShowOnChart));
      this.updateTimesChart(stats.taskNames.slice(-this.numOfTasksToShowOnChart), stats.taskTimes.slice(-this.numOfTasksToShowOnChart));
    });
  }

  private updateMarksChart(taskNames: string[], taskMarks: number[]): void {
    this.taskMarksChart.data[0].x = taskNames;
    this.taskMarksChart.data[0].y = taskMarks;
  }

  private updateTimesChart(taskNames: string[], taskTimes: number[]): void {
    this.taskTimeChart.data[0].x = taskNames;
    this.taskTimeChart.data[0].y = taskTimes;
  }
}
