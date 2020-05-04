export class Change {
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
