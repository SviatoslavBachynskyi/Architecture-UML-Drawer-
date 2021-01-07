export interface Task {
  id: number;
  title: string;
  type: string;
  averageExecutionTime: Date;
  level: string;
  description: string;
}

export const TasksSeededData: Task[] = [
  {
    id: 1,
    title: 'Фабричний метод',
    type: 'Породжувальний',
    description:
      'Визначити базовий абстрактний клас "UIElement", який містить у собі метод "CreateElement(): UIElement", що перевизначається у дочірніх класах "HtmlButton" та "HtmlAnchorTag"',
    averageExecutionTime: new Date(0, 0, 0, 0, 7, 32),
    level: 'Легка',
  },
  {
    id: 2,
    title: 'Фабричний метод',
    type: 'Породжувальний',
    description:
      'Визначити базовий абстрактний клас "UIElement", який містить у собі метод "CreateElement(): UIElement", що перевизначається у дочірніх класах "HtmlButton" та "HtmlAnchorTag"',
    averageExecutionTime: new Date(0, 0, 0, 0, 7, 32),
    level: 'Легка',
  },
  {
    id: 3,
    title: 'Декоратор',
    type: 'Породжувальний',
    description:
      'Визначити базовий декоратор "Notifier" для відправлення сповіщень, який містить у собі метод "Notify(message: string): void". Також додати класи "SMSDecorator", "FacebookDecorator", "SkypeDecorator" що допомагають відправляти сповіщення через вказані сервіси',
    averageExecutionTime: new Date(0, 0, 0, 0, 14, 53),
    level: 'Середня'
  },
  {
    id: 4,
    title: 'Декоратор',
    type: 'Породжувальний',
    description:
      'Визначити базовий декоратор "Notifier" для відправлення сповіщень, який містить у собі метод "Notify(message: string): void". Також додати класи "SMSDecorator", "FacebookDecorator", "SkypeDecorator" що допомагають відправляти сповіщення через вказані сервіси',
    averageExecutionTime: new Date(0, 0, 0, 0, 14, 53),
    level: 'Середня'
  },
];
