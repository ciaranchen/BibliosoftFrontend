import { MetaBook } from './MetaBook';
export class Payment {
  constructor (
    public book: MetaBook,
    public pay: string
  ) {}
}
