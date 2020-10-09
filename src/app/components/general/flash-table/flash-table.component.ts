import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DisplayedColumn, RowAction } from 'src/app/models/component.model';

@Component({
  selector: 'flash-table',
  templateUrl: './flash-table.component.html',
  styleUrls: ['./flash-table.component.less'],
})
export class FlashTableComponent {
  @Input() tableClass: string;
  @Input() dataSource: any[];
  @Input() displayedColumns: DisplayedColumn[];
  @Input() isCentered: boolean = false;
  @Input() isFlat: boolean = false;
  @Input() isRaised: boolean = false;
  @Input() tableWidth: string;

  @Output() onActionMenuClick = new EventEmitter<RowAction>();

  constructor() {}

  ngOnInit() {
    this.dataSource.forEach((element, index) => {
      element.index = index;
    });
  }

  public mapColumnConfigsToKeys(displayedColumns: DisplayedColumn[]): string[] {
    return displayedColumns.map((column: DisplayedColumn) => column.key);
  }

  public onActionClicked(action: string, index: number) {
    const rowAction: RowAction = { value: action, rowIndex: index };
    this.onActionMenuClick.emit(rowAction);
  }
}
