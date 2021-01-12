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

  getTaskById(taskId: number): Task {
    return this.getTasks().find(t => t.id === taskId);
  }

  getTasksByIds(taskIds: number[]): Task[] {
    return this.getTasks().filter(t => taskIds.indexOf(t.id) >= 0);
  }

  getCompletedTasks(): CompletedTask[] {
    const completedTasksString = localStorage.getItem(KeyCompletedTasks);
    return JSON.parse(completedTasksString);
  }

  getUserCompletedTasks(username: string, taskId?: number): CompletedTask[] {
    let res = this.getCompletedTasks().filter(t => t.username === username);
    if (taskId) {
      res = this.getCompletionForTask(res, taskId);
    }

    return res;
  }

  getCompletionForTask(completedTasks: CompletedTask[], taskId: number): CompletedTask[] {
    return completedTasks.filter(ct => ct.taskId === taskId);
  }

  getMark(completions: CompletedTask[]): number {
    return completions.reduce((max, ct) => max.mark > ct.mark ? max : ct).mark;
  }

  getBestTime(completions: CompletedTask[]): number {
    return completions.reduce((best, ct) => best.elapsedSeconds < ct.elapsedSeconds ? best : ct).elapsedSeconds;
  }


  mapCompletionToMarks(completedTasks: CompletedTask[]): Mark[] {
    const tasks = this.getTasksByIds(completedTasks.map(ct => ct.taskId));

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
    }).sort((a, b) => moment(b.dateCompleted).diff(moment(a.dateCompleted)));

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

  getUserMarks(username: string): Mark[] {
    const completedTasks = this.getUserCompletedTasks(username);

    return this.mapCompletionToMarks(completedTasks);
  }

  addTask(newTask: Omit<Task, 'id'>): number {
    const tasksString = localStorage.getItem(KeyTasks);
    const tasks = JSON.parse(tasksString) as Task[];

    if (tasks.find(t => t.title === newTask.title)) {
      return null;
    }

    const lastTask = tasks.sort((a, b) => a.id - b.id)[tasks.length - 1];
    const createId = !!lastTask ? lastTask.id + 1 : 1;

    tasks.push({
      ...newTask,
      id: createId
    });

    localStorage.setItem(KeyTasks, JSON.stringify(tasks));

    return createId;
  }

  addEtalon(taskId: number, etalon: string): void {
    const tasks = this.getTasks();
    const updated = tasks.find(t => t.id === taskId);

    if (!updated) { return; }

    if (!!(updated.etalon)) { return; }

    updated.etalon = etalon;

    localStorage.setItem(KeyTasks, JSON.stringify(tasks));
  }

  addCompletedTask(completedTask: CompletedTask): void {

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
