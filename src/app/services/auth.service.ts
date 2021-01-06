import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { User, UsersSeededData } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser = new BehaviorSubject<User>(null);
  allUsersKey = 'users';
  currentUserKey = 'currentUser';

  constructor(public router: Router) {
    this.ensureUsersSeeded();
    const currentUserString = localStorage.getItem(this.currentUserKey);
    const currentUser =
      currentUserString.length === 0 ? null : JSON.parse(currentUserString);
    this.currentUser.next(currentUser);
  }

  getCurrentUser(): Observable<User> {
    return this.currentUser.asObservable();
  }

  getUsers(): User[] {
    const tasksString = localStorage.getItem(this.allUsersKey);
    return JSON.parse(tasksString);
  }

  addUser(newUser: User): void {
    const usersString = localStorage.getItem(this.allUsersKey);
    const users = JSON.parse(usersString) as User[];
    users.push(newUser);

    localStorage.setItem(this.allUsersKey, JSON.stringify(newUser));
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.currentUserKey);
  }

  login(username: string, password: string): boolean {
    const allUsers = this.getUsers();
    const currentUser = allUsers.find(
      (x) => x.username === username && x.password === password
    );

    const loginSuccessful = !!currentUser;
    if (loginSuccessful) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(currentUser));
      this.currentUser.next(currentUser);
      this.router.navigate(['tasks']).then();
    }

    return loginSuccessful;
  }

  logout(): void {
    localStorage.setItem(this.currentUserKey, '');
    this.currentUser.next(null);
    this.router.navigate(['login']).then();
  }

  private ensureUsersSeeded(): void {
    if (localStorage.getItem(this.allUsersKey)) {
      return;
    }

    localStorage.setItem(this.allUsersKey, JSON.stringify(UsersSeededData));
  }
}
