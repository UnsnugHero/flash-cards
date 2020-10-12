import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Deck } from 'src/app/models/deck.model';

interface ManageDecksDialogData {
  decks: Deck[];
}

@Component({
  selector: 'category-manage-decks-dialog',
  templateUrl: './category-manage-decks.dialog.html',
  // styleUrls: ['./name.component.less']
})
export class CategoryManageDecksDialog {
  public addedDecksControl = new FormControl(null, Validators.required);

  constructor(
    private _snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<ManageDecksDialogData>,
    @Inject(MAT_DIALOG_DATA) public data: ManageDecksDialogData
  ) {}

  ngOnInit() {}
}
