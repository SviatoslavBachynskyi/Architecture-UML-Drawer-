import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/data/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-create-etalon',
  templateUrl: './create-etalon.component.html',
  styleUrls: ['./create-etalon.component.scss']
})
export class CreateEtalonComponent implements OnInit {
  task: Task;

  constructor(
    private route: ActivatedRoute,
    private taskService: TasksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const taskId: number = +this.route.snapshot.params.taskId;
    this.task = this.taskService.getTaskById(taskId);

    window.addEventListener('message', (msg) => {
      if (!msg.data) {
        return;
      }

      const etalon = JSON.parse(msg.data);
      console.log(etalon);
      this.taskService.addEtalon(taskId, msg.data);

      this.router.navigate(['tasks']).then();
    });
  }
}
