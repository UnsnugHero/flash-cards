import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DisplayedColumn, RowAction } from 'src/app/models/component.model';

@Component({
  selector: 'flash-table',
  templateUrl: './flash-table.component.html',
  styleUrls: ['./flash-table.component.less'],
})
export class FlashTableComponent {
  // class to add to table
  @Input() tableClass: string;
  // Data that displays in the table
  @Input() dataSource: any[];
  // controls what columns display in the table
  @Input() displayedColumns: DisplayedColumn[];
  // Enables mat paginator
  @Input() enablePagination: boolean = false;
  // Adds class modifier to center the table on the page
  @Input() isCentered: boolean = false;
  // Desire width of the table
  @Input() tableWidth: string;
  // Total items in table, displayed in paginator
  @Input() totalItems: number;

  @Output() onActionMenuClick = new EventEmitter<RowAction>();
  @Output() onPaginate = new EventEmitter<PageEvent>();

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

  public onPaginated(event: PageEvent) {
    this.onPaginate.emit(event);
  }
}
