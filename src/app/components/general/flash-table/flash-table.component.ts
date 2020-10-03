import { Component, Input } from '@angular/core';

@Component({
  selector: 'flash-table',
  templateUrl: './flash-table.component.html',
  styleUrls: ['./flash-table.component.less'],
})
export class FlashTableComponent {
  @Input() dataSource: any[];
  @Input() columnConfigs: any[]; // TODO: model for this

  constructor() {}

  ngOnInit() {}
}
