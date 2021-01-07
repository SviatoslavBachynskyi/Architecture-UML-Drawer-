import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { UserStatistics } from '../models/userStatistics.model';
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

        if (userMarks.length <= 0) {
          return null;
        }

        const taskMarks = userMarks.map(m => m.value);
        const taskTimes = userMarks.map(m => Math.floor(m.timeSpent.getTime() / 1000));
        const taskNames = userMarks.map(m => m.attemptNumber === 1 ? m.task : `${m.task} (спроба ${m.attemptNumber})`);

        return {
          averageCompletionTime: taskTimes.reduce((a, b) => a + b) / completedTasks.length,
          averageMark: taskMarks.reduce((a, b) => a + b) / completedTasks.length,
          tasksCompletedLastWeek: completedTasks.filter(ct => moment().subtract(1, 'week').isBefore(ct.dateCompleted)).length,
          taskNames,
          taskMarks,
          taskTimes
        };
      })
    );
  }
}
