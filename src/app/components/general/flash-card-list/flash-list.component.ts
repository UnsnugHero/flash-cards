import { Component, Input } from '@angular/core';

interface ListItem {
  answer: string;
  mnemonic?: string;
  prompt: string;
}

@Component({
  selector: 'flash-list',
  templateUrl: './flash-list.component.html',
  styleUrls: ['./flash-list.component.less'],
})
export class FlashListComponent {
  /** boolean to enable deleting list items */
  /** TODO: this would imply disabling checkbox to I suppose, but that can come later */
  @Input() enableDelete: boolean = true;
  /** items to be displayed in the list */
  @Input() listItems: ListItem[];
  /** name of data source */
  @Input() listSourceName: string;
  /** name of data plural form */
  @Input() listSourceNamePlural: string;

  constructor() {}

  ngOnInit() {}
}
