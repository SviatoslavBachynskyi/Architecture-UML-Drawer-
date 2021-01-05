export interface User {
  username: string;
  password: string;
  fullname: string;
}

export const UsersSeededData: User[] = [
  {
    username: 'admin',
    password: 'qwerty',
    fullname: 'Андрій Фоменко',
  },
  {
    username: 'student',
    password: 'qwerty',
    fullname: 'Святослав Бачинський',
  },
];
