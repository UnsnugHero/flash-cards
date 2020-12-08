import { Component, Inject } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SNACKBAR_DURATION } from '@utilities/common.constants';

interface EditDialogData {
  categoryName: string;
}

@Component({
  selector: 'edit-category-dialog',
  templateUrl: './edit-category.dialog.html',
  // styleUrls: ['./edit-category.dialog.less'],
})
export class EditCategoryDialog {
  public editCategoryControl: FormControl;

  constructor(
    public dialogRef: MatDialogRef<EditCategoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EditDialogData,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.editCategoryControl = new FormControl(
      this.data.categoryName || '',
      Validators.required
    );
  }

  public onEditClick() {
    if (this.editCategoryControl.invalid) {
      this.openSnackBar('Category name required', 'Dismiss', {
        duration: SNACKBAR_DURATION,
      });
      return;
    }
    this.openSnackBar('Category name updated!', 'Dismiss', {
      duration: SNACKBAR_DURATION,
    });
    return this.dialogRef.close(this.editCategoryControl.value);
  }

  public openSnackBar(
    message: string,
    action: string,
    configs?: MatSnackBarConfig
  ) {
    this._snackbar.open(message, action, configs);
  }
}
