import { Component, Input } from '@angular/core';
import { HeaderItem } from 'src/app/models/component.model';

@Component({
  selector: 'flash-header',
  templateUrl: './flash-header.component.html',
  styleUrls: ['./flash-header.component.less'],
})
export class FlashHeaderComponent {
  @Input() headerLinks: HeaderItem[];
  // somethin of the sort for like account and settings?
  //@Input() headerRightItems: HeaderItem[]

  constructor() {}

  ngOnInit() {}
}
