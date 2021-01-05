import { Injectable } from '@angular/core';

import { User, UsersSeededData } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  allUsersKey = 'users';
  currentUserKey = 'currentUser';

  constructor() {
    this.ensureUsersSeeded();
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

    localStorage.setItem(this.currentUserKey, JSON.stringify(currentUser));

    return !!currentUser;
  }

  logout(): void {
    localStorage.setItem(this.currentUserKey, '');
  }

  private ensureUsersSeeded(): void {
    if (localStorage.getItem(this.allUsersKey)) {
      return;
    }

    localStorage.setItem(this.allUsersKey, JSON.stringify(UsersSeededData));
  }
}
