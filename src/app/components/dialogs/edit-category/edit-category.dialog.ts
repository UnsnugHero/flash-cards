import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

interface EditDialogData {
  categoryName: string;
}

const SNACKBAR_DURATION: number = 5000;

@Component({
  selector: 'edit-category-dialog',
  templateUrl: './edit-category.dialog.html',
  // styleUrls: ['./edit-category.dialog.less'],
})
export class EditCategoryDialog {
  public editCategoryControl: FormControl;

  constructor(
    private _snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<EditCategoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EditDialogData
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
