export class Change {
  user?: string;  // Username; Overridden by the server when it broadcasts it
  op: 'insert' | 'delete' | 'set';
  pos: number;
  length: number;
  value: string;

  constructor(op: 'insert' | 'delete' | 'set', pos: number, length: number, value: string) {
    this.op = op;
    this.pos = pos;
    this.length = length;
    this.value = value;
  }
}
