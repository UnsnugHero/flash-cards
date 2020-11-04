/**
 * Dialog for any action that ends in either a cancel or confirm action. How the result is handled
 * depends on the component that implements it. This dialog will not have any configurations of its
 * own, it is all determined by the component that implements it. This includes title and message.
 */

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogData } from '@models/dialog.model';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm.dialog.html',
  // styleUrls: ['./name.component.scss']
})
export class ConfirmDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  ngOnInit() {}
}
