import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListItem } from '@models/component.model';

@Component({
  selector: 'flash-list',
  templateUrl: './flash-list.component.html',
  styleUrls: ['./flash-list.component.less'],
})
export class FlashListComponent {
  /** boolean to enable deleting list items */
  /** TODO: this would imply disabling checkbox too I suppose, but that can come later */
  @Input() enableDelete: boolean = true;
  /** items to be displayed in the list */
  @Input() listItems: any[];
  /** name of data source */
  @Input() listSourceName: string;
  /** name of data plural form */
  @Input() listSourceNamePlural: string;

  /** emits index of list item deleted */
  @Output() onDeleteListItemClick = new EventEmitter<number>();
  /** emits list item info on list item row click */
  @Output() onListItemClick = new EventEmitter<ListItem>();

  constructor() {}

  ngOnInit() {}

  public handleDeleteListItemClick(index: number) {
    this.listItems.splice(index, 1);
    this.onDeleteListItemClick.emit(index);
  }

  public handleListItemClick(index: number) {
    this.onListItemClick.emit({
      listItem: this.listItems[index],
      listItemIndex: index,
    });
  }
}
