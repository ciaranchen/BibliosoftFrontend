export class Borrow {
  constructor(
    public id: number,
    public barcode: string,
    public librarian_id: string,
    public reader_id: string,
    public borrow_time: Date,
    public return_time?: Date
  ) { }
}
