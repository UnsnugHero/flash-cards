package main

// Card Model
type Card struct {
	ID       int
	DeckID   int
	Prompt   string
	Answer   string
	Mnemonic string
}

// Deck Model
type Deck struct {
	ID    int
	Title string
	Cards []*Card
}

// Category Model
type Category struct {
	ID              int
	CategoryName    string
	AssociatedDecks int // this might be a slice of decks instead? flesh out more
}
