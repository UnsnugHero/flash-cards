export interface HeaderItem {
  text: string;
  link?: string;
}

export interface MenuOption {
  text: string;
  value: string; //string? or something else?
}

export interface DisplayedColumn {
  key: string;
  columnHeader: string;
  menuOptions?: MenuOption[];
}
