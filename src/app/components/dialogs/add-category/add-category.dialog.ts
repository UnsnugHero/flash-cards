import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SNACKBAR_DURATION } from '@utilities/common.constants';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './add-category.dialog.html',
  // styleUrls: ['./name.component.scss']
})
export class AddCategoryDialog {
  public addCategoryControl: FormControl;

  constructor(
    public dialogRef: MatDialogRef<AddCategoryDialog>,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.addCategoryControl = new FormControl('', Validators.required);
  }

  public onAddClick() {
    if (this.addCategoryControl.invalid) {
      this.openSnackBar('Category name required', 'Dismiss', {
        duration: SNACKBAR_DURATION,
      });
      return;
    }

    this.openSnackBar('Category name added!', 'Dismiss', {
      duration: SNACKBAR_DURATION,
    });
    return this.dialogRef.close(this.addCategoryControl.value);
  }

  public openSnackBar(
    message: string,
    action: string,
    configs?: MatSnackBarConfig
  ) {
    this._snackbar.open(message, action, configs);
  }
}
