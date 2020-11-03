# Problems I am facing

1. I am not sure how to handle the dropdown menu of the autocomplete component. I can do one of several things

- Not show any dropdown until the user starts typing when which the component
  emits whats the user typed and a search request gets results based on this query. This makes sense in some way as what if the user has a huge collection of said option and the dropdown is a million miles long. But, if the user does not have many of said option, this approach does not make much sense and is more of an inconvenience than anything since if they don't have that many options then the dropdown should just showup.
- Always show the dropdown with all the options. I don't think this is a good approach as it is only viable in the beginning when a user might not have too many entries for a given option but it could become unsustainable when the user starts garnering a large collection of this option.
- Im thinking that a combination of these two approaches is the solution and I shouldn't even be writing this becuase it was kind of obvious? Or not im not too sure. Anyway, I could always show the dropdown as long as the number of options for this dropdown does not exceed a certain threshold, lets say `100` for now. Then, when this threshold is exceeded, show a little message saying something like `Too many results too show, please narrow down your query` until the user narrows this down to a size of options less than the threshold size.
- I noticed that the search bar expands a bit when you click on the plus button on the right side of the search bar. Will probably rework that sometime but just putting it here in case I forget or something.
