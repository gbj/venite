export class Cursor {
  user?: string; // Username; Overridden by the server when it broadcasts it
  path: string;
  start: number;
  end: number;
  element: HTMLTextAreaElement | HTMLInputElement;

  constructor(path: string, start: number, end: number, element: HTMLTextAreaElement | HTMLInputElement) {
    this.path = path;
    this.start = start;
    this.end = end;
    this.element = element;
  }
}
