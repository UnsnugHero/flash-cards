import { Component, Input } from '@angular/core';

@Component({
  selector: 'flash-table',
  templateUrl: './flash-table.component.html',
  styleUrls: ['./flash-table.component.less'],
})
export class FlashTableComponent {
  @Input() tableClass: string;
  @Input() dataSource: any[];
  @Input() displayedColumns: string[];
  @Input() isCentered: boolean = false;
  @Input() isFlat: boolean = false;
  @Input() isRaised: boolean = false;
  @Input() tableWidth: string;

  constructor() {}

  ngOnInit() {}
}
