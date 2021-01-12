import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from "rxjs";

import { Task } from 'src/app/models/data/task.model';
import { TasksService } from '../../services/tasks.service';
import { EvaluationService } from "../../services/evaluation.service";
import { AuthService } from "../../services/auth.service";
import { User } from "../../models/data/user.model";

@Component({
  selector: 'app-execute-task',
  templateUrl: './execute-task.component.html',
  styleUrls: ['./execute-task.component.scss'],
})
export class ExecuteTaskComponent implements OnInit, OnDestroy {
  task: Task;
  currentUser: User;
  subscription: Subscription;
  startDate = new Date();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TasksService,
    private evaluationService: EvaluationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.params.taskId;
    this.task = this.taskService.getTaskById(+taskId);

    window.addEventListener('message', this.onUserSubmitTask);

    this.subscription = this.authService.getCurrentUser().subscribe(u => this.currentUser = u);
  }

  onUserSubmitTask = (msg: MessageEvent): void => {
    const dataInvalid = typeof(msg.data) !== "string";
    if (dataInvalid) {
      return;
    }

    const mark = this.evaluationService.evaluateTask(this.task.etalon, msg.data, 10);
    const endDate = new Date();

    this.taskService.addCompletedTask({
      dateCompleted: new Date(),
      elapsedSeconds: (endDate.getDate() - this.startDate.getDate()) / 1000,
      mark,
      taskId: this.task.id,
      username: this.currentUser.username
    });

    this.router.navigate(['marks']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    window.removeEventListener('message', this.onUserSubmitTask);
  }
}
