import { DisplayedColumn, MenuOption } from 'src/app/models/component.model';

export const TABLE_MENU_OPTIONS: MenuOption[] = [
  { text: 'Edit', value: '' },
  { text: 'Delete', value: '' },
];

export const DISPLAYED_COLUMNS: DisplayedColumn[] = [
  { key: 'category', columnHeader: 'Category', columnWidth: '45%' },
  {
    key: 'associatedDecks',
    columnHeader: 'Associated Decks',
    columnWidth: '45%',
  },
  {
    key: 'menuAction',
    columnHeader: '',
    columnWidth: '10%',
    menuIcon: 'more_vert',
    menuOptions: TABLE_MENU_OPTIONS,
  },
];
