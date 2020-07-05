export class Reminder {
  title: string;
  time: string;
  on: {
    hour: number;
    minute: number;
  }
  active: boolean = false;
}