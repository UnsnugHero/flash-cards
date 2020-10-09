import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuOption } from 'src/app/models/component.model';

@Component({
  selector: 'flash-menu',
  templateUrl: './flash-menu.component.html',
  styleUrls: ['./flash-menu.component.less'],
})
export class FlashMenuComponent {
  @Input() menuText: string;
  @Input() menuOptions: MenuOption[];

  @Output() onMenuItemClick = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  public onMenuItemClicked(menuItem: string) {
    this.onMenuItemClick.emit(menuItem);
  }
}
