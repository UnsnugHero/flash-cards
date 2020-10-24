import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'flash-autocomplete',
  templateUrl: './flash-autocomplete.component.html',
  styleUrls: ['./flash-autocomplete.component.less'],
})
export class FlashAutocompleteComponent {
  // Form control for this component
  @Input() formCtrl: AbstractControl;
  // options to show in the dropdown
  @Input() options: any[];

  // Emitter that fires when the input has a keyup event
  @Output() onAutocompleteKeyup = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  public handleAutocompleteKeyup(keyupEvent: any) {
    this.onAutocompleteKeyup.emit(keyupEvent.target.value);
  }
}
