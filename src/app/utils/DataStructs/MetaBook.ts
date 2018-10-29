export class MetaBook {
  // default is not loaded from Douban
  // public fromDouban = false;

  constructor (
    public isbn: string,
    public title: string,
    public author: string,
    public price: number,
    public publisher: string,
    public keyword?: string,
    public publish_year?: string,
    public pages?: number,
    public cover?: string,
    public subtitle?: string,
    public desc_html?: string
  ) {}
}
