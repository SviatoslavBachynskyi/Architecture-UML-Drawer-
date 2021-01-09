import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { TaskChartPair, UserStatistics } from '../models/userStatistics.model';
import { AuthService } from './auth.service';
import { TasksService } from './tasks.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private authService: AuthService, private tasksService: TasksService) { }

  getUserStatistics(): Observable<UserStatistics> {
    return this.authService.getCurrentUser().pipe(
      map(user => {
        if (!user) {
          return null;
        }

        const userMarks = this.tasksService.getUserMarks(user.username)
          .sort((a, b) => moment(a.dateCompleted).diff(moment(b.dateCompleted)));
        const completedTasks = this.tasksService.getUserCompletedTasks(user.username);

        const tasks = this.tasksService.getTasksById(completedTasks.map(ct => ct.taskId));

        if (userMarks.length <= 0) {
          return null;
        }

        const taskMarks: TaskChartPair[] = [];
        const taskTimes: TaskChartPair[] = [];

        tasks.forEach(t => {
          const completions = completedTasks.filter(ct => ct.taskId === t.id);

          const taskName = t.title.length < 12 ?
            t.title
            : `${t.title.substr(0, 12)}...`;

          const highestMark = completions.reduce((max, ct) => max.mark > ct.mark ? max : ct);
          const bestTime = completions.reduce((best, ct) => best.elapsedSeconds < ct.elapsedSeconds ? best : ct);

          taskMarks.push({taskName, value: highestMark.mark});
          taskTimes.push({taskName, value: bestTime.elapsedSeconds});
        });

        return {
          averageCompletionTime: taskTimes.map(tt => tt.value).reduce((a, b) => a + b) / taskTimes.length,
          averageMark: taskMarks.map(tm => tm.value).reduce((a, b) => a + b) / taskMarks.length,
          tasksCompletedLastWeek: completedTasks.filter(ct => moment().subtract(1, 'week').isBefore(ct.dateCompleted)).length,
          taskMarks,
          taskTimes
        };
      })
    );
  }
}
