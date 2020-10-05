import { Component, Input } from '@angular/core';
import { DisplayedColumn } from 'src/app/models/component.model';

@Component({
  selector: 'flash-table',
  templateUrl: './flash-table.component.html',
  styleUrls: ['./flash-table.component.less'],
})
export class FlashTableComponent {
  @Input() tableClass: string;
  @Input() dataSource: any;
  @Input() displayedColumns: DisplayedColumn[];
  @Input() isCentered: boolean = false;
  @Input() isFlat: boolean = false;
  @Input() isRaised: boolean = false;
  @Input() tableWidth: string;

  constructor() {}

  ngOnInit() {}

  public mapColumnConfigsToKeys(displayedColumns: DisplayedColumn[]): string[] {
    return displayedColumns.map((column: DisplayedColumn) => column.key);
  }
}
