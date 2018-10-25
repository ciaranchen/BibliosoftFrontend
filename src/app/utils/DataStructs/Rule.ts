export class Rule {
  constructor(
    public borrowAmount: number,
    public defaultDeposit: number,
    public defaultPeriod: number,
    public defaultFine: number,
    public reserveTime: number
  ) {}
}
