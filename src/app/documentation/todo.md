# To-Do for App

## Front End Related To-Do

- In dialogs I currently do not use custom components just for sake of a quicker implementation of the frontend. I can ome back and implement with custom components later on. The problem I didn;t feel like circumnavigating was problem with input needing a form control which I don't want to pass into the dialog to keep as much state out of it as possible. I could probably come up with an implementation for `flash-input` that doesn't require it to have a form control so I can just take whatever was inputted in the input and pas it out on dialog submit. Plan to replace all inputs and actions in dialog with custom components essentially.
