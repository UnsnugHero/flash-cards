import { ConfirmDialogData } from '@models/dialog.model';

export const FINISH_ADD_CARDS_DIALOG_CONFIGS: ConfirmDialogData = {
  dialogTitle: 'Finish Adding Cards?',
  bodyMessage:
    'This will add all cards you configured in this session to the deck.',
  confirmButtonText: 'Finish',
};

export const CANCEL_ADD_CARDS_DIALOG_CONFIGS: ConfirmDialogData = {
  dialogTitle: 'Leave Page?',
  bodyMessage:
    "You have cards to be added but haven't saved. Do you want to leave this page without saving?",
};
