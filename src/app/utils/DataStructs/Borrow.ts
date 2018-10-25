export class Borrow {
  constructor(
    public id: string,
    public barcode: string,
    public librarian_id: string,
    public reader_id: string,
    public borrow_time: number,
    public return_time?: number
  ) { }
}
