export class Operation {
  p?: (number | string | undefined)[];
  type: 'insertAt' | 'deleteAt' | 'set' | 'delete' | 'edit';
  index?: number | string;
  oldValue?: any;
  value?: any;
}

export class Change {
  user?: string; // Username; Overridden by the server when it broadcasts it
  path: string;
  op: Operation[];

  fullyPathedOp(): Operation[] {
    const p: (string | number | undefined)[] = this.path
      ? this.path.split('/').filter((part) => (Number(part) ? Number(part) : part))
      : new Array();

    return this.op.map((op) => ({ ...op, p }));
  }

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<Change> = {}) {
    Object.assign(this, data);
  }
}
