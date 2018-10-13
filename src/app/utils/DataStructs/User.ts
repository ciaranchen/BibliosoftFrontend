export class User {
  constructor(
    public username: string,
    private password: string,
    public role: number,
    public nickname: string
  ) {}
}
