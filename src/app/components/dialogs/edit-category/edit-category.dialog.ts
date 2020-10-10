import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface EditDialogData {
  categoryName: string;
}

@Component({
  selector: 'edit-category-dialog',
  templateUrl: './edit-category.dialog.html',
  // styleUrls: ['./edit-category.dialog.less']
})
export class EditCategoryDialog {
  constructor(
    public dialogRef: MatDialogRef<EditCategoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EditDialogData
  ) {}

  ngOnInit() {}
}
