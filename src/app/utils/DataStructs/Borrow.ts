export class Borrow {
  public id: string = '';
  public barcode: string = '';
  public fine: number = 0;
  public librarian_id: string = '';
  public reader_id: string = '';
  public borrow_time: number;
  public return_time: number;
  public fine_update_date: number;

  constructor() {}
}
