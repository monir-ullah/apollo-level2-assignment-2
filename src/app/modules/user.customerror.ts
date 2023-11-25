// defined custom error
export class UserNotFoundError extends Error {
  constructor(mesg: string) {
    super(mesg);
    this.name = 'User Not Found';
  }
}
