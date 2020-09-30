import { Component, Input } from '@angular/core';

@Component({
  selector: 'flash-deck',
  templateUrl: './flash-deck.component.html',
  styleUrls: ['./flash-deck.component.less'],
})
export class FlashDeckComponent {
  @Input() deckTitle: string;

  constructor() {}

  ngOnInit() {}

  public onClick() {
    console.log(`you have clicked on ${this.deckTitle}`);
  }
}
