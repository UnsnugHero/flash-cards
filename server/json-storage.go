package main

// this json db implementation runs off of the golang module golang-scribble
import (
	"fmt"

	scribble "github.com/nanobox-io/golang-scribble"
)

const (
	// CollectionDeck identifier for Deck JSON key
	CollectionDeck = "decks"
)

// JSONStorage is a struct containing our JSON db driver
// and implements the Storage interface for storing data
type JSONStorage struct {
	db *scribble.Driver
}

// NewJSONStorage initializes our storage client and returns it
func NewJSONStorage(storageLocation string) (*JSONStorage, error) {
	var err error

	// initialize storage as pointer to JSONStorage struct instance
	storage := new(JSONStorage)

	// initialize the scribble driver, we provide the location it writes to
	storage.db, err = scribble.New(storageLocation, nil)

	if err != nil {
		return nil, err
	}

	return storage, nil
}

// StoreDeck stores a new deck in storage
func (storage *JSONStorage) StoreDeck(newDeck Deck) error {
	// first, we should check in our storage if a deck with this title exists
	allDecks, err := storage.FindDecks()

	if err != nil {
		return err
	}

	fmt.Println(allDecks)

	return nil
}

// FindDeck retrieves a deck by ID
func (storage *JSONStorage) FindDeck() (Deck, error) {
	var err error

	return Deck{}, err
}

// FindDecks retrieves all decks matching search query in payload
// TODO: though for now, it will just get them ALL, so empty arguments
func (storage *JSONStorage) FindDecks() ([]Deck, error) {
	records, err := storage.db.ReadAll(CollectionDeck)

	if err != nil {
		return nil, err
	}

	fmt.Println(records)

	return []Deck{Deck{ID: 1, Title: "Deck 1", Categories: []Category{}, Cards: []Card{}}}, nil
}
