import { Component, Input } from '@angular/core';

interface ListItem {
  answer: string;
  mnemonic?: string;
  prompt: string;
}

@Component({
  selector: 'flash-card-list',
  templateUrl: './flash-card-list.component.html',
  styleUrls: ['./flash-card-list.component.less'],
})
export class FlashCardListComponent {
  /** items to be displayed in the list */
  @Input() listItems: ListItem[];

  constructor() {}

  ngOnInit() {}
}
