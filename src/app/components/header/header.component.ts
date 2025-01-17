import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { User } from '../../models/data/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  currentUser: User;
  isAdmin = false;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userSubscription = this.authService
      .getCurrentUser()
      .subscribe((user) => {
        this.currentUser = user;
        this.isAdmin = this.authService.isUserAdmin();
      });
  }

  onAddStudent(): void {
    this.router.navigate(['add-student']).then();
  }

  onLogout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
