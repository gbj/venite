export class Change {
  user?: string;  // Username; Overridden by the server when it broadcasts it
  path: string;
  op: 'insert' | 'delete' | 'set';
  pos: number;
  length: number;
  value: string;
  textBefore: string;
  textAfter: string;

  constructor(path : string, op: 'insert' | 'delete' | 'set', pos: number, length: number, value: string, textBefore : string, textAfter : string) {
    this.path = path;
    this.op = op;
    this.pos = pos;
    this.length = length;
    this.value = value;
    this.textBefore = textBefore;
    this.textAfter = textAfter;
  }
}
