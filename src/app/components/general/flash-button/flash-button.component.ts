import { Component, Input } from '@angular/core';

@Component({
  selector: 'flash-button',
  templateUrl: './flash-button.component.html',
  styleUrls: ['./flash-button.component.less'],
})
export class FlashButtonComponent {
  /**
   * Button text if a text button
   */
  @Input() text: string;
  /**
   * Controls button type
   */
  @Input() type: 'text' | 'icon'; //can add more if needed. Maybe export as a type in constants
  /**
   * Icon if icon button type
   */
  @Input() icon: string;

  constructor() {}

  ngOnInit() {}
}
