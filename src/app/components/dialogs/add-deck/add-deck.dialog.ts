import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Category } from 'src/app/models/deck.model';

interface AddDeckDialogData {
  categories: Category[];
}

const SNACKBAR_DURATION: number = 5000;

@Component({
  selector: 'add-deck-dialog',
  templateUrl: './add-deck.dialog.html',
  // styleUrls: ['./add-deck.dialog.less'],
})
export class AddDeckDialog {
  public addDeckFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddDeckDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AddDeckDialogData,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.addDeckFormGroup = new FormGroup({
      deckName: new FormControl(null, Validators.required),
      category: new FormControl(null),
    });
  }

  public onAddClick() {
    if (this.addDeckFormGroup.invalid) {
      this.openSnackBar('Deck name required', 'Dismiss', {
        duration: SNACKBAR_DURATION,
      });
      return;
    }
    this.openSnackBar('Deck created!', 'Dismiss', {
      duration: SNACKBAR_DURATION,
    });
    return this.dialogRef.close(this.addDeckFormGroup.value);
  }

  public openSnackBar(
    message: string,
    action: string,
    configs?: MatSnackBarConfig
  ) {
    this._snackbar.open(message, action, configs);
  }
}
