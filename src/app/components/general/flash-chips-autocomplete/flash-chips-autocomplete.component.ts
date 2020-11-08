import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AbstractControl } from '@ngneat/reactive-forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AutocompleteOption } from '@models/component.model';

@Component({
  selector: 'flash-chips-autocomplete',
  templateUrl: './flash-chips-autocomplete.component.html',
  styleUrls: ['./flash-chips-autocomplete.component.less'],
})
export class FlashChipsAutocompleteComponent {
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

  /** Event emitter that fires on input keyup and emits the input value */
  @Output() onAutocompleteKeyup = new EventEmitter<string>();

  @ViewChild('chipsInput') chipInput: ElementRef<HTMLInputElement>;

  constructor() {}

  public handleAutocompleteKeyup(keyupEvent: any) {
    this.onAutocompleteKeyup.emit(keyupEvent.target.value);
  }

  /** called when an option is selected from the autocomplete dropdown */
  public selected(event: MatAutocompleteSelectedEvent) {
    const chosenOption: AutocompleteOption = event.option.value;

    this.chosenOptions.push(chosenOption);
    this.chipInput.nativeElement.value = '';
    this.formCtrl.setValue(this.chosenOptions);

    this.options = [
      ...this.options.filter((option) => {
        return option.id !== chosenOption.id;
      }),
    ];
  }

  public remove(option: any) {
    let removedOption: AutocompleteOption[];

    const index = this.chosenOptions.indexOf(option);

    if (index >= 0) {
      removedOption = this.chosenOptions.splice(index, 1);
    }

    if (removedOption && removedOption.length) {
      this.options.push(removedOption[0]);
    }
  }
}
