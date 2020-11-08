import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'flash-card',
  templateUrl: './flash-card.component.html',
  styleUrls: ['./flash-card.component.less'],
})
export class FlashCardComponent {
  public isCardFlipped: boolean = false;

  /** String displayed on the back side of the card */
  @Input() answer: string;
  /** boolean field to make card a form card vs a flash card */
  @Input() isFormCard: boolean = false;
  /** string that displays underneath the answer (controlled by button under card that says show mnemonics?) */
  @Input() mnemonic: string;
  /** form group for new card if form card */
  @Input() newCardFormGroup: FormGroup;
  /** String corresponding displayed on the front of the card */
  @Input() prompt: string;
  /** boolean to determine wether to show mnemonic */
  @Input() showMnemonic: boolean = false;

  constructor() {}

  ngOnInit() {}
}
