import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { COMMA, ENTER, P } from '@angular/cdk/keycodes';
import { AbstractControl } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { AutocompleteOption } from 'src/app/models/component.model';

@Component({
  selector: 'flash-chips-autocomplete',
  templateUrl: './flash-chips-autocomplete.component.html',
  styleUrls: ['./flash-chips-autocomplete.component.less'],
})
export class FlashChipsAutocomplete {
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  /** Options chosen that show as chips */
  public chosenOptions: AutocompleteOption[] = [];

  /** Form control for this component */
  @Input() formCtrl: AbstractControl;
  /** options for the autocomplete dropdown */
  @Input() options: AutocompleteOption[];
  /** label placeholder for the autocomplete */
  @Input() placeholder: string;
  /** Determines if chips are removable from chosen options */
  @Input() removable: boolean = true;
  /** Determines if chips are selectable or not */
  @Input() selectable: boolean = false;

  @ViewChild('chipsInput') chipInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor() {}

  remove(option: any) {
    let removedOption;

    const index = this.chosenOptions.indexOf(option);

    if (index >= 0) {
      removedOption = this.chosenOptions.splice(index, 1);
    }

    if (removedOption && removedOption.length) {
      this.options.push(removedOption[0]);
    }
  }

  /** called when an option is selected from the autocomplete dropdown */
  selected(event: MatAutocompleteSelectedEvent) {
    const chosenOption: AutocompleteOption = event.option.value;

    this.chosenOptions.push(chosenOption);
    this.chipInput.nativeElement.value = '';
    this.formCtrl.setValue(this.chosenOptions);

    this.options = [
      ...this.options.filter((option) => {
        console.log(option);
        console.log(chosenOption);
        return option.id !== chosenOption.id;
      }),
    ];
  }
}
