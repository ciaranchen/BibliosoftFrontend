export class Book {
  constructor(
    public barcode: string,
    public isbn: string,
    public addTime: Date,
    public location: string
  ) {}
}
