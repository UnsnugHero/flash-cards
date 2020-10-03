import { Component, Input } from '@angular/core';
import { FlashMenuOption } from 'src/app/models/component.model';

@Component({
  selector: 'flash-menu',
  templateUrl: './flash-menu.component.html',
  styleUrls: ['./flash-menu.component.less'],
})
export class FlashMenuComponent {
  @Input() menuText: string;
  @Input() menuOptions: FlashMenuOption[];

  constructor() {}

  ngOnInit() {}
}