import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'flash-autocomplete',
  templateUrl: './flash-autocomplete.component.html',
  styleUrls: ['./flash-autocomplete.component.less'],
})
export class FlashAutocompleteComponent {
  @Input() formCtrl: AbstractControl;
  @Input() options: any[];

  constructor() {}

  ngOnInit() {
    console.log(this.options);
  }
}
