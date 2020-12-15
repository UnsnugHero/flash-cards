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
	ID         string     `json:"id,omitempty" bson:"_id,omitempty"`
	Name       string     `json:"name" bson:"name"`
	Cards      []Card     `json:"cards" bson:"cards"`
	Categories []Category `json:"categories" bson:"categories"`
}

// Category Model
type Category struct {
	ID              string `json:"id,omitempty" bson:"_id,omitempty"`
	Name            string `json:"name" bson:"name"`
	AssociatedDecks int    `json:"associatedDecks" bson:"associatedDecks"`
}
