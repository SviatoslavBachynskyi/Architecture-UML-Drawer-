export interface Task {
  id: number;
  title: string;
  description: string;
}

export const TasksSeededData: Task[] = [
  {
    id: 1,
    title: 'Фабричний метод',
    description:
      'Визначити базовий абстрактний клас "UIElement", який містить у собі метод "CreateElement(): UIElement", що перевизначається у дочірніх класах "HtmlButton" та "HtmlAnchorTag"',
  },
  {
    id: 2,
    title: 'Фабричний метод',
    description:
      'Визначити базовий абстрактний клас "UIElement", який містить у собі метод "CreateElement(): UIElement", що перевизначається у дочірніх класах "HtmlButton" та "HtmlAnchorTag"',
  },
  {
    id: 3,
    title: 'Декоратор',
    description:
      'Визначити базовий декоратор "Notifier" для відправлення сповіщень, який містить у собі метод "Notify(message: string): void". Також додати класи "SMSDecorator", "FacebookDecorator", "SkypeDecorator" що допомагають відправляти сповіщення через вказані сервіси',
  },
  {
    id: 4,
    title: 'Декоратор',
    description:
      'Визначити базовий декоратор "Notifier" для відправлення сповіщень, який містить у собі метод "Notify(message: string): void". Також додати класи "SMSDecorator", "FacebookDecorator", "SkypeDecorator" що допомагають відправляти сповіщення через вказані сервіси',
  },
];
