import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuOption } from 'src/app/models/component.model';

@Component({
  selector: 'flash-menu',
  templateUrl: './flash-menu.component.html',
  styleUrls: ['./flash-menu.component.less'],
})
export class FlashMenuComponent {
  // determines if menu button is icon or text
  @Input() buttonType: 'icon' | 'text';
  // If icon type, the icon to display
  @Input() icon: string;
  // Text to display if not icon, or alt text if icon?
  @Input() menuText: string;
  // Options to choose from menu
  @Input() menuOptions: MenuOption[];

  // Event Emitter when clicking on menu item, emits configured value
  @Output() onMenuItemClick = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  public onMenuItemClicked(menuItem: string) {
    this.onMenuItemClick.emit(menuItem);
  }
}
