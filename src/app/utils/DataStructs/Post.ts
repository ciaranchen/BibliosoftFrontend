export class Post {
  time: string;
  username: string;
  id: number;

  constructor(
    public title: string,
    public content: string
  ) {}
}
