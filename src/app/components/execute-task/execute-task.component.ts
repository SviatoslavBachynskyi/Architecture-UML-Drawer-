import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Task } from 'src/app/models/data/task.model';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-execute-task',
  templateUrl: './execute-task.component.html',
  styleUrls: ['./execute-task.component.scss'],
})
export class ExecuteTaskComponent implements OnInit, OnDestroy {
  task: Task;

  constructor(
    private route: ActivatedRoute,
    private taskService: TasksService
  ) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.params.taskId;
    this.task = this.taskService.getTaskById(+taskId);

    window.addEventListener('message', this.onUserSubmitTask);
  }

  onUserSubmitTask(msg): void {
    if (!msg.data) {
      return;
    }

    console.log(JSON.parse(msg.data));
  }

  ngOnDestroy(): void {
    window.removeEventListener('message', this.onUserSubmitTask);
  }
}
