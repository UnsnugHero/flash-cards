package main

//
// DATABASE MODELS
//

// Card Model
type Card struct {
	ID       string `json:"id" bson:"_id,omitempty"`
	Prompt   string `json:"prompt" bson:"prompty"`
	Answer   string `json:"answer" bson:"answer"`
	Mnemonic string `json:"mnemonic" bson:"mnemonic"`
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
