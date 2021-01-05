import { Component, OnInit } from '@angular/core';

import { TasksService } from '../../services/tasks.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: Task[];

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasks = this.tasksService.getTasks();
  }
}
