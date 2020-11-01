import { Component, Input } from '@angular/core';

@Component({
  selector: 'flash-card',
  templateUrl: './flash-card.component.html',
  styleUrls: ['./flash-card.component.less'],
})
export class FlashCardComponent {
  public isCardFlipped: boolean = false;

  /** String displayed on the back side of the card */
  @Input() answer: string;
  /** string that displays underneath the answer (controlled by button under card that says show mnemonics?) */
  @Input() mnemonic: string;
  /** String corresponding displayed on the front of the card */
  @Input() prompt: string;
  /** boolean to determine wether to show mnemonic */
  @Input() showMnemonic: boolean = false;

  constructor() {}

  ngOnInit() {}
}
