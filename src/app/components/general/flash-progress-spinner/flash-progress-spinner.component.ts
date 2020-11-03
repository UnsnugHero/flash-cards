import { Component, Input } from '@angular/core';

@Component({
  selector: 'flash-progress-spinner',
  templateUrl: './flash-progress-spinner.component.html',
  styleUrls: ['./flash-progress-spinner.component.less'],
})
export class FlashProgressSpinner {
  /** string that displays beneath spinner  */
  @Input() loadingContent: string;

  constructor() {}

  ngOnInit() {}
}
