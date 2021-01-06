import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  form: FormGroup;
  loginInvalid: boolean;
  formSubmitAttempt: boolean;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      fullname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;

    if (this.form.valid) {
      const fullname = this.form.get('fullname').value;
      const username = this.form.get('username').value;
      const password = this.form.get('password').value;

      if (this.authService.addUser({ username, password, fullname })) {
        alert('Нового користувача успішно додано');
        this.form.reset();
      } else {
        alert('Користувач з таким логіном уже існує в системі');
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}
