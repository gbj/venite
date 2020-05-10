class Json0Operation {
  p: (number | string | undefined)[];
  li?: any;
  lm?: any;
  ld?: any;
  oi?: any;
  od?: any;
  om?: any;
  si?: any;
  sd?: any;
}

export class Change {
  user?: string;  // Username; Overridden by the server when it broadcasts it
  path: string;
  op: Json0Operation[];

  constructor(path : string, op: Json0Operation[]) {
    this.path = path;
    this.op = op;
  }
}
