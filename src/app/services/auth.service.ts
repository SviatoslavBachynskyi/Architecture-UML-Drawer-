import { Injectable } from '@angular/core';

import { User, UsersSeededData } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  key = 'users';

  constructor() {
    this.ensureUsersSeeded();
  }

  getTasks(): User[] {
    const tasksString = localStorage.getItem(this.key);
    return JSON.parse(tasksString);
  }

  addUser(newUser: User): void {
    const usersString = localStorage.getItem(this.key);
    const users = JSON.parse(usersString) as User[];
    users.push(newUser);

    localStorage.setItem(this.key, JSON.stringify(newUser));
  }

  private ensureUsersSeeded(): void {
    if (localStorage.getItem(this.key)) {
      return;
    }

    localStorage.setItem(this.key, JSON.stringify(UsersSeededData));
  }
}
