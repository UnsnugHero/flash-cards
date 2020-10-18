import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'flash-input',
  templateUrl: './flash-input.component.html',
  styleUrls: ['./flash-input.component.less'],
})
export class FlashInputComponent {
  @Input() clearable: boolean;
  @Input() placeholder: string;
  @Input() formCtrl: AbstractControl;

  constructor() {}

  ngOnInit() {}

  public onClearClicked() {
    this.formCtrl.setValue('');
  }
}
