import {MatSnackBar} from "@angular/material";

export class MessageService {
  constructor(
    private snackBar: MatSnackBar
  ) {}

  push_message(msg: string, type?: string): void {
    const panelClass = ['snack-bar-bottom'];
    let action = 'Ok';
    if (type) {
      if (type === 'success') {
        action = 'great';
      } else if (type === 'danger') {
        action = 'oh no!';
      }
      panelClass.push('bg-' + type);
    }
    this.snackBar.open(msg, action, {
      duration: 10000,
      panelClass: panelClass
    });
  }
}
