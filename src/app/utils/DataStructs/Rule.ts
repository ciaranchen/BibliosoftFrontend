export class Rule {
  constructor(
    public borrow_limitation: number,
    public membership_deposit: number,
    public return_period: number,
    public fine_unit_in_cent: number,
    public reservation_minutes: number
  ) {}
}
