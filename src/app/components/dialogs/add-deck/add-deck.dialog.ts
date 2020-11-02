// external
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// models
import { AutocompleteOption } from '@models/component.model';
import { Category } from '@models/deck.model';

// services
import { CategoryService } from '@services/category.service';

const SNACKBAR_DURATION: number = 5000;

@Component({
  selector: 'add-deck-dialog',
  templateUrl: './add-deck.dialog.html',
  // styleUrls: ['./add-deck.dialog.less'],
})
export class AddDeckDialog {
  public addDeckFormGroup: FormGroup;
  public chipsCategories$: Observable<AutocompleteOption[]>;

  constructor(
    public categoryService: CategoryService,
    public dialogRef: MatDialogRef<AddDeckDialog>,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.addDeckFormGroup = new FormGroup({
      deckName: new FormControl(null, Validators.required),
      categories: new FormControl(null),
    });

    this.chipsCategories$ = this.categoryService.getCategories().pipe(
      map((categories: Category[]) => {
        return categories.map((category: Category) => {
          const autocompleteOption: AutocompleteOption = {
            text: category.categoryName,
            id: category.id,
          };
          return autocompleteOption;
        });
      })
    );
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

  public onCategoryChipAutocompleteKeyup(query: string) {
    this.categoryService.categorySubject$.next(query);
  }

  public openSnackBar(
    message: string,
    action: string,
    configs?: MatSnackBarConfig
  ) {
    this._snackbar.open(message, action, configs);
  }
}
