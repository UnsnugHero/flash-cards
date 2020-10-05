export interface HeaderItem {
  text: string;
  link?: string;
}

export interface MenuOption {
  text: string;
  value: string; //string? or something else?
  action?: Function;
}

export interface DisplayedColumn {
  key: string;
  columnHeader: string;
  columnWidth?: string;
  menuIcon?: string;
  menuOptions?: MenuOption[];
}
