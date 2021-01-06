import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  currentUser: User;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSubscription = this.authService
      .getCurrentUser()
      .subscribe((user) => {
        this.currentUser = user;
      });
  }

  onLogout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
