import {Income} from "./Income";

export class DateIncome {
  constructor(
    public date: Date,
    public fine: number = 0,
    public deposit: number = 0,
    public incomes: Array<Income> = []
  ) {}
}
