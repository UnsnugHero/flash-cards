package main

//
// DATABASE MODELS
//

// Card Model
type Card struct {
	ID       int    `json:"id"`
	DeckID   int    `json:"deckId"`
	Prompt   string `json:"prompt"`
	Answer   string `json:"answer"`
	Mnemonic string `json:"mnemonic"`
}

// Deck Model
// ID is mongo assigned Object ID
type Deck struct {
	ID         string     `json:"id"`
	Title      string     `json:"title"`
	Cards      []Card     `json:"cards"`
	Categories []Category `json:"categories"`
}

// Category Model
type Category struct {
	ID              string `json:"id"`
	Name            string `json:"name"`
	AssociatedDecks int    `json:"associatedDecks"`
}
