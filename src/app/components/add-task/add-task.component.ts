import { ViewChild } from '@angular/core';
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

  constructor(
    private fb: FormBuilder,
    private taskService: TasksService,
    private router: Router
  ) { }
  form: FormGroup;
  error: string;
  @ViewChild('imageFile') imageFile;

  image: string;

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      level: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  trimLeft(initialString: string, stringToTrim: string): string {
    return initialString.startsWith(stringToTrim) ? initialString.substring(stringToTrim.length) : initialString;
  }

  onSubmit(): void {
    if (this.form.valid) {
      const fileInput = this.imageFile.nativeElement;
      if (fileInput.files && fileInput.files[0]) {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const image = String(fileReader.result);
          this.image = this.trimLeft(image, 'data:image/png;base64,');

          this.saveTask();
        };

        fileReader.readAsDataURL(fileInput.files[0]);
      }

    }
  }
  saveTask(): void {
    const formInput = {
      title: this.form.get('title').value,
      type: this.form.get('type').value,
      level: this.form.get('level').value,
      description: this.form.get('description').value,
      image: this.image,
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
