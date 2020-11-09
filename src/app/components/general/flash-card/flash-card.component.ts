import { Component, Input } from '@angular/core';
import { Card } from '@models/card.model';
import { FormGroup } from '@ngneat/reactive-forms';

@Component({
  selector: 'flash-card',
  templateUrl: './flash-card.component.html',
  styleUrls: ['./flash-card.component.less'],
})
export class FlashCardComponent {
  public isCardFlipped: boolean = false;

  /** form group for new card if form card */
  @Input() addCardFormGroup: FormGroup<Card>;
  /** String displayed on the back side of the card */
  @Input() answer: string;
  /** boolean field to make card a form card vs a flash card */
  @Input() isFormCard: boolean = false;
  /** string that displays underneath the answer (controlled by button under card that says show mnemonics?) */
  @Input() mnemonic: string;
  /** String corresponding displayed on the front of the card */
  @Input() prompt: string;
  /** boolean to determine wether to show mnemonic */
  @Input() showMnemonic: boolean = false;

  constructor() {}

  ngOnInit() {}
}
