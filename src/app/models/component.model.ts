export interface HeaderItem {
  text: string;
  link?: string;
}

export interface MenuOption {
  text: string;
  value: string;
}

export interface RowAction {
  value: string;
  rowIndex: number;
}

export interface DisplayedColumn {
  key: string;
  columnHeader: string;
  columnWidth?: string;
  menuIcon?: string;
  menuOptions?: MenuOption[];
}
