import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  form: FormGroup;
  error: string;

  constructor(
    private fb: FormBuilder,
    private taskService: TasksService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      level: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formInput = {
      title: this.form.get('title').value,
      type: this.form.get('type').value,
      level: this.form.get('level').value,
      description: this.form.get('description').value,
      image: null
      };

      const result = (this.taskService.addTask(formInput));

      if (!!result) {
        this.error = null;
        this.router.navigate(['create-etalon', result]).then();
      } else {
        this.error = 'Завдання з такою назвою вже існує';
      }
    }
  }
}
