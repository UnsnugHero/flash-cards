import {
  DisplayedColumn,
  MenuOption,
  SelectOption,
} from 'src/app/models/component.model';

export type CategoryTableAction = 'editCategory' | 'deleteCategory';

export const TABLE_MENU_OPTIONS: MenuOption[] = [
  { text: 'Edit', value: 'editCategory' },
  { text: 'Delete', value: 'deleteCategory' },
];

export const CATEGORY_SEARCH_SORT_MENU_OPTIONS: SelectOption[] = [
  { text: 'Category Name (A - Z)', sortDir: 'ASC', value: 'categoryName' },
  { text: 'Category Name (Z - A)', sortDir: 'DESC', value: 'categoryName' },
  { text: 'Associated Decks Asc', sortDir: 'ASC', value: 'associatedDecks' },
  { text: 'Associated Decks Desc', sortDir: 'DESC', value: 'associatedDecks' },
];

export const DISPLAYED_COLUMNS: DisplayedColumn[] = [
  { key: 'categoryName', columnHeader: 'Category Name', columnWidth: '45%' },
  {
    key: 'associatedDecks',
    columnHeader: 'Associated Decks',
    columnWidth: '45%',
  },
  {
    key: 'menuAction',
    columnHeader: '',
    columnWidth: '10%',
    menuButtonType: 'icon',
    menuIcon: 'more_vert',
    menuOptions: TABLE_MENU_OPTIONS,
  },
];
