# To-Do for App

## Front End Related To-Do

- In dialogs I currently do not use custom components just for sake of a quicker implementation of the frontend. Plan to replace all inputs and actions in dialogs with custom components.
- in this vein, an input should show an error if its corresponding form control is invalid.
- edit-category dialog, and future stuff similar to this (basically any form that has required fields), will need this update. Update forms to show each required field as an error, so add a red border to each not filled out required field and a little error underneath too. Or maybe like a red text near the submit button?... But anyway, ill be putting in a snackbar saying theres an error at the very least so thats fine.
- on the deck-overview page, I anticipate (cause it pretty obvious) that loading the cards would take much longer than the deck info (or maybe getting the deck info gets the cards? probably) so if its this way then put a loader on the card.
- probably want to move snackbars for dialogs into services? where it makes sense to for instance adding a card doesnt make sense to snack bar popup on actually finishing the action through the backend, so snackbar after the request goes through and succeeds (and different one on fail it catchError of course)

## Front End/ Back end

- Implement service search methods so that the only required base payload is the input/query. This way it can be used to search for autocompletes. I can simply enforce page size and page on payloads when I need to. Calling search with just the input will query on the entirety of that option, and so for the case of an autocomplete, if the size of the response is biger than a certain threshold (as we said before, probably `100`), then the autocomplete will just show a this query is too big message and ask them to narrow the query.

## Back end
