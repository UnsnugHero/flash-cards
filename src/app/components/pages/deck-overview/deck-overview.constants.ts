import { ConfirmDialogData } from '@models/dialog.model';

export const DELETE_CARD_DIALOG_CONFIG_DATA: ConfirmDialogData = {
  dialogTitle: 'Delete Card?',
  bodyMessage: 'Deleting a card cannot be undone.',
  confirmButtonText: 'Delete',
};

export const DELETE_DECK_DIALOG_CONFIG_DATA: ConfirmDialogData = {
  dialogTitle: 'Delete Deck?',
  bodyMessage:
    'Deleting a deck cannot be undone. This will also delete all cards in the deck.',
  confirmButtonText: 'Delete',
};
