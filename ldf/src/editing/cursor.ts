export class Cursor {
  element: HTMLTextAreaElement;
  start: number;
  end: number;

  constructor(element: HTMLTextAreaElement, start: number, end: number) {
    this.element = element;
    this.start = start;
    this.end = end;
  }
}
