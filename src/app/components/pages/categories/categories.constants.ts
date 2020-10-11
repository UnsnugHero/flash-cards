import { DisplayedColumn, MenuOption } from 'src/app/models/component.model';

export type CategoryTableAction =
  | 'addDecks'
  | 'editCategory'
  | 'deleteCategory';

export const TABLE_MENU_OPTIONS: MenuOption[] = [
  { text: 'Add Decks', value: 'addDecks' },
  { text: 'Edit', value: 'editCategory' },
  { text: 'Delete', value: 'deleteCategory' },
];

export const DISPLAYED_COLUMNS: DisplayedColumn[] = [
  { key: 'categoryName', columnHeader: 'Category', columnWidth: '45%' },
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
