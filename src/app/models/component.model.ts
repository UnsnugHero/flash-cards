/** Model all options passed to an autocomplete based component
 * should follow. Will need to map our objects to this model.
 */
export interface AutocompleteOption {
  text: string;
  id: number;
}

export interface DisplayedColumn {
  key: string;
  columnHeader: string;
  columnWidth?: string;
  menuButtonType?: 'icon' | 'text';
  menuIcon?: string;
  menuOptions?: MenuOption[];
}

export interface HeaderItem {
  link?: string;
  text: string;
}

export interface MenuOption {
  text: string;
  value: string;
}

export interface SelectOption {
  text: string;
  value: string;

  sortDir?: string;
}

export interface RowAction {
  rowIndex: number;
  value: string;
}
