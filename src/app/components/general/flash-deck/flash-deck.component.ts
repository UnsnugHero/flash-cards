import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'flash-deck',
  templateUrl: './flash-deck.component.html',
  styleUrls: ['./flash-deck.component.less'],
})
export class FlashDeckComponent {
  // id of this deck to redirect to deck view
  @Input() deckId: number;
  // text displayed on the card
  @Input() deckName: string;

  // event emitter that emits deckId so decks view can handle url navigation
  @Output() onDeckClick = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  public handleDeckClick() {
    this.onDeckClick.emit(this.deckId);
  }
}
