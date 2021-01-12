import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { UserStatistics } from 'src/app/models/userStatistics.model';
import { StatsService } from 'src/app/services/stats.service';

const chartSize = 386;
const numOfTasksToShowOnChart = 5;

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
    taskMarks: [],
    taskTimes: []
  };


  taskMarksChart = {
    data: [
        { x: [], y: [], type: 'bar', width: 0.667, marker: {color: '#3366cc'} }
    ],
    layout: { width: chartSize * 1.2, height: chartSize, title: 'Оцінки за завдання', barmode: 'relative',
      xaxis: { title: { text: 'Завдання' }},
      yaxis: { title: { text: 'Оцінка' }}
    },
    displayModeBar: false
  };

  taskTimeChart = {
    data: [
        { x: [], y: [], type: 'bar', width: 0.667, marker: {color: '#3366cc'} }
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

      this.updateMarksChart(
        stats.taskMarks.map(t => t.taskName).slice(-numOfTasksToShowOnChart),
        stats.taskMarks.map(t => t.value).slice(-numOfTasksToShowOnChart)
      );

      this.updateTimesChart(
        stats.taskTimes.map(t => t.taskName).slice(-numOfTasksToShowOnChart),
        stats.taskTimes.map(t => +(t.value / 60).toFixed(1)).slice(-numOfTasksToShowOnChart)
      );
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
