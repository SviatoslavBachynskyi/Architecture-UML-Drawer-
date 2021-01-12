import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { TasksService } from './../../services/tasks.service';
import { User } from './../../models/data/user.model';
import { Mark } from '../../models/mark.model';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.scss']
})
export class MarksComponent implements OnInit {

  marks: Mark[];

  constructor(private authService: AuthService, private taskService: TasksService) { }

  ngOnInit(): void {
    let user: User;
    this.authService.getCurrentUser().subscribe(res => user = res);
    this.marks = this.taskService.getUserMarks(user.username);
    this.marks.forEach(m => m.timeSpent.setHours(0));
  }

}
