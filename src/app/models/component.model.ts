export interface HeaderItem {
  link?: string;
  text: string;
}

export interface MenuOption {
  sortDir?: string;
  text: string;
  value: string;
}

export interface RowAction {
  rowIndex: number;
  value: string;
}

export interface DisplayedColumn {
  key: string;
  columnHeader: string;
  columnWidth?: string;
  menuButtonType?: 'icon' | 'text';
  menuIcon?: string;
  menuOptions?: MenuOption[];
}
