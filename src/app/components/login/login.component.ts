import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loginInvalid: boolean;
  formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const returnUrl = this.route.snapshot.queryParams.returnUrl || '/tasks';

    this.redirectIfAuthenticated(returnUrl);

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.redirectIfAuthenticated(returnUrl);
  }

  onSubmit(): void {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;

    if (this.form.valid) {
      const username = this.form.get('username').value;
      const password = this.form.get('password').value;
      this.loginInvalid = !this.authService.login(username, password);
    } else {
      this.formSubmitAttempt = true;
    }
  }

  redirectIfAuthenticated(returnUrl: string): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate([returnUrl]).then();
    }
  }
}
