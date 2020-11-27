package main

// Card Model
type Card struct {
	ID       int    `json:"id"`
	DeckID   int    `json:"deckId"`
	Prompt   string `json:"prompt"`
	Answer   string `json:"answer"`
	Mnemonic string `json:"mnemonic"`
}

// Deck Model
type Deck struct {
	ID         int        `json:"id"`
	Title      string     `json:"title"`
	Cards      []Card     `json:"cards"`
	Categories []Category `json:"categories"`
}

// Category Model
type Category struct {
	ID              int    `json:"id"`
	Name            string `json:"name"`
	AssociatedDecks int    `json:"associatedDecks"`
}
