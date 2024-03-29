import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AbstractControl } from '@ngneat/reactive-forms';
import { SelectOption } from '@models/component.model';

@Component({
  selector: 'flash-select',
  templateUrl: './flash-select.component.html',
  styleUrls: ['./flash-select.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class FlashSelectComponent {
  // Enables an option to clear the selection
  @Input() enableClearSelection: boolean = false;
  // Form control for this select component
  @Input() formCtrl: AbstractControl;
  // Text displayed for select menu
  @Input() selectText: string;
  // Select options
  @Input() selectOptions: SelectOption[];

  constructor() {}

  ngOnInit() {}
}
