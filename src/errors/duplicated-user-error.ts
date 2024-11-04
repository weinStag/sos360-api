export class DuplicatedUserError extends Error {
  public readonly name: string = 'DuplicatedUserError';
  constructor() {
    super('User is already registered');
  }
}
