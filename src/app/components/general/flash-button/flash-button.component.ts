import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'flash-button',
  templateUrl: './flash-button.component.html',
  styleUrls: ['./flash-button.component.less'],
})
export class FlashButtonComponent {
  @Input() text: string;

  constructor() {}

  ngOnInit() {}
}
