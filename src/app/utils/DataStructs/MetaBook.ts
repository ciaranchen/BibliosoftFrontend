export class MetaBook {
  // default is not loaded from Douban
  // public fromDouban = false;

  public isbn: string;
  public title: string;
  public author: string;
  public publisher: string;
  public keyword?: string;
  public publish_year?: number;
  public pages?: number;
  public cover?: string;
  public subtitle?: string;
  public desc_html?: string;
  public price?: number;

  constructor () {}
}
