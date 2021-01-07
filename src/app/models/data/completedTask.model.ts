export interface CompletedTask {
  taskId: number;
  username: string;
  mark: number;
  dateCompleted: Date;
  elapsedSeconds: number;
}

export const CompletedTasksSeededData: CompletedTask[] = [
  {
    taskId: 1,
    username: 'student',
    mark: 8,
    dateCompleted: new Date(2021, 0, 5, 18, 22, 35),
    elapsedSeconds: 700
  },
  {
    taskId: 3,
    username: 'student',
    mark: 4,
    dateCompleted: new Date(2021, 0, 6, 9, 10, 55),
    elapsedSeconds: 981
  },
  {
    taskId: 2,
    username: 'student',
    mark: 7,
    dateCompleted: new Date(2021, 0, 5, 22, 3, 49),
    elapsedSeconds: 666
  },
  {
    taskId: 1,
    username: 'student',
    mark: 10,
    dateCompleted: new Date(2021, 0, 7, 20, 33, 24),
    elapsedSeconds: 653
  },
  {
    taskId: 1,
    username: 'student',
    mark: 2,
    dateCompleted: new Date(2020, 11, 31, 20, 33, 24),
    elapsedSeconds: 653
  },
  {
    taskId: 1,
    username: 'student',
    mark: 3,
    dateCompleted: new Date(2020, 11, 25, 20, 33, 24),
    elapsedSeconds: 653
  },
  {
    taskId: 1,
    username: 'student',
    mark: 6,
    dateCompleted: new Date(2020, 11, 1, 20, 33, 24),
    elapsedSeconds: 653
  },
];
