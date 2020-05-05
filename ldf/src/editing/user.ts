export class User {
  client : string;  // Given by Socket.IO
  room : string;    // Document ID
  username: string;
  color: string;

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<User> = {}) {
    Object.assign(this, data);
  }
}
