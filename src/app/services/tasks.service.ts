import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { CompletedTask, CompletedTasksSeededData } from '../models/data/completedTask.model';

import { Task, TasksSeededData } from '../models/data/task.model';
import { Mark } from '../models/mark.model';

const KeyTasks = 'tasks';
const KeyCompletedTasks = 'completed_tasks';

@Injectable({
  providedIn: 'root',
})
export class TasksService {

  constructor() {
    this.ensureTasksSeeded();
    this.ensureTaskCompletionSeeded();
  }

  getTasks(): Task[] {
    const tasksString = localStorage.getItem(KeyTasks);
    return JSON.parse(tasksString);
  }

  getTasksById(taskId: number[]): Task[] {
    return this.getTasks().filter(t => taskId.indexOf(t.id) >= 0);
  }

  getCompletedTasks(): CompletedTask[] {
    const completedTasksString = localStorage.getItem(KeyCompletedTasks);
    return JSON.parse(completedTasksString);
  }

  getUserCompletedTasks(username: string): CompletedTask[] {
    return this.getCompletedTasks().filter(t => t.username === username);
  }

  getUserMarks(username: string): Mark[] {
    const completedTasks = this.getUserCompletedTasks(username);

    const tasks = this.getTasksById(completedTasks.map(ct => ct.taskId));

    const marks: Mark[] = completedTasks.map(ct => {
      const mark: Mark = {
        task: tasks.find(t => t.id === ct.taskId).title,
        taskId: ct.taskId,
        value: ct.mark,
        dateCompleted: ct.dateCompleted,
        timeSpent: new Date(0),
        attemptNumber: null,
      };
      mark.timeSpent.setSeconds(ct.elapsedSeconds);

      return mark;
    }).sort((a, b) => moment(a.dateCompleted).diff(moment(b.dateCompleted)));

    const markAttempts = new Map<number, number>();

    marks.forEach(m => {
      if (markAttempts.has(m.taskId)) {
        m.attemptNumber = markAttempts.get(m.taskId) + 1;
      } else {
        m.attemptNumber = 1;
      }
      markAttempts.set(m.taskId, m.attemptNumber);
    });

    return marks;
  }

  addTask(newTask: Task): void {
    const tasksString = localStorage.getItem(KeyTasks);
    const tasks = JSON.parse(tasksString) as Task[];
    tasks.push(newTask);

    localStorage.setItem(KeyTasks, JSON.stringify(newTask));
  }

  private ensureTasksSeeded(): void {
    if (localStorage.getItem(KeyTasks)) {
      return;
    }

    localStorage.setItem(KeyTasks, JSON.stringify(TasksSeededData));
  }

  private ensureTaskCompletionSeeded(): void {
    if (localStorage.getItem(KeyCompletedTasks)) {
      return;
    }

    localStorage.setItem(KeyCompletedTasks, JSON.stringify(CompletedTasksSeededData));
  }
}
