export class BookLocation {
  room: string = '';
  shelf: string = '';
  level: string = '';

  toString(): string {
    return [this.room, this.shelf, this.level].map(data => data.replace(/-/g, '_')).join('-');
  }

  from_string(s): BookLocation {
    const strSplits = s.split('-');
    if (strSplits.length !== 3) {
      return null;
    }
    this.room = strSplits[0];
    this.shelf = strSplits[1];
    this.level = strSplits[2];
    return this;
  }
}
