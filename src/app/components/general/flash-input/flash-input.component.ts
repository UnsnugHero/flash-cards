import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AbstractControl } from '@ngneat/reactive-forms';

@Component({
  selector: 'flash-input',
  templateUrl: './flash-input.component.html',
  styleUrls: ['./flash-input.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class FlashInputComponent {
  /** form control for this component */
  @Input() formCtrl: AbstractControl;
  /** determines wether this component instance is an input or a textarea */
  @Input() isTextarea: boolean = false;
  /** placeholder text that turns into the label on input click */
  @Input() placeholder: string;

  constructor() {}

  ngOnInit() {}

  public onClearClicked() {
    this.formCtrl.setValue('');
  }
}
