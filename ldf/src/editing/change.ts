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

  fullyPathedOp() {
    console.log('(fullyPathedOp)', this, this.path, this.op);
    const pathParts : (string | number | undefined)[] = this.path ?
      this.path
        .split('/')
        .filter(part => part) :
      new Array();

    return this.op.map(op => ({ ... op, p: pathParts.concat(op.p) }));
  }

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<Change> = {}) {
    Object.assign(this, data);
  }
}
