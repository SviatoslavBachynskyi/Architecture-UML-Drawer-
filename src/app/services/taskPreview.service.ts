import { Injectable } from '@angular/core';

import { CompletedTask } from '../models/data/completedTask.model';
import { TaskPreview } from '../models/taskPreview.model';
import { TasksService } from './tasks.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskPreviewService {

  constructor(private tasksService: TasksService, private authService: AuthService) { }

  getTaskPreview(taskId: number): TaskPreview {

    let user;
    this.authService.getCurrentUser().subscribe(u => user = u);

    const task = this.tasksService.getTaskById(taskId);
    const completedTasks = this.tasksService.getUserCompletedTasks(user.username, taskId);
    const anyCompletedTask = completedTasks && completedTasks.length;
    const bestTime = new Date(0);
    if (anyCompletedTask) {
      bestTime.setSeconds(this.tasksService.getBestTime(completedTasks));
    }
    const res = {
      id: taskId,
      title: task.title,
      type: task.type,
      image: task.image,
      level: task.level,
      description: task.description,
      marks: anyCompletedTask ? this.tasksService.mapCompletionToMarks(completedTasks) : undefined,
      bestExecutionTime: anyCompletedTask ? bestTime : undefined,
      currentMark: anyCompletedTask ? this.tasksService.getMark(completedTasks) : undefined,
    };

    return res;
  }
}
