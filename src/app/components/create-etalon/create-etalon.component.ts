import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/data/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-create-etalon',
  templateUrl: './create-etalon.component.html',
  styleUrls: ['./create-etalon.component.scss']
})
export class CreateEtalonComponent implements OnInit, OnDestroy {
  task: Task;
  bound: any;

  constructor(
    private route: ActivatedRoute,
    private taskService: TasksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const taskId: number = +this.route.snapshot.params.taskId;
    this.task = this.taskService.getTaskById(taskId);

    this.bound = this.handler.bind(this);
    window.addEventListener('message', this.bound);
  }

  ngOnDestroy(): void {
    window.removeEventListener('message', this.bound);
  }

  private handler(msg: MessageEvent<any>): void {
    if (!msg.data) {
      return;
    }

    const etalon = JSON.parse(msg.data);
    console.log(etalon);
    this.taskService.addEtalon(this.task.id, msg.data);

    this.router.navigate(['tasks']).then();
  }
}
