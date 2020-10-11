import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Deck } from 'src/app/models/deck.model';

interface AddDecksDialogData {
  decks: Deck[];
}

@Component({
  selector: 'add-decks-to-category-dialog',
  templateUrl: './add-decks-to-category.dialog.html',
  // styleUrls: ['./name.component.less']
})
export class AddDecksToCategoryDialog {
  public addedDecksControl = new FormControl(null, Validators.required);

  constructor(
    private _snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<AddDecksDialogData>,
    @Inject(MAT_DIALOG_DATA) public data: AddDecksDialogData
  ) {}

  ngOnInit() {}
}
