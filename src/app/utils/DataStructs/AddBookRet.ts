export class AddBookRet {
  constructor (
    public barcode: number,
    public isbn: number,
    public addTime: Date,
    public location: string
  ) { }
}
