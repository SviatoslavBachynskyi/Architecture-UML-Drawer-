export interface UserStatistics {
  averageCompletionTime: number;
  averageMark: number;
  tasksCompletedLastWeek: number;
  taskMarks: TaskChartPair[];
  taskTimes: TaskChartPair[];
}

export interface TaskChartPair {
  value: number;
  taskName: string;
}
