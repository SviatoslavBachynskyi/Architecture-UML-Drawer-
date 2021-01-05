import { Injectable } from '@angular/core';

import { Task, TasksSeededData } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  key = 'tasks';

  constructor() {
    this.ensureTasksSeeded();
  }

  getTasks(): Task[] {
    const tasksString = localStorage.getItem(this.key);
    return JSON.parse(tasksString);
  }

  addTask(newTask: Task): void {
    const tasksString = localStorage.getItem(this.key);
    const tasks = JSON.parse(tasksString) as Task[];
    tasks.push(newTask);

    localStorage.setItem(this.key, JSON.stringify(newTask));
  }

  private ensureTasksSeeded(): void {
    if (localStorage.getItem(this.key)) {
      return;
    }

    localStorage.setItem(this.key, JSON.stringify(TasksSeededData));
  }
}
