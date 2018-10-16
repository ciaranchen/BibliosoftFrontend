export class User {
  constructor(
    public username: string,
    public email: string,
    public nickname?: string,
    public address?: string,
    public slogan?: string
  ) { }
}
