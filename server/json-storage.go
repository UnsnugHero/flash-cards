package main

// this json db implementation runs off of the golang module golang-scribble
import (
	"encoding/json"
	"fmt"
	"strconv"

	scribble "github.com/nanobox-io/golang-scribble"
	"github.com/pkg/errors"
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

	for _, deck := range allDecks {
		if newDeck.Title == deck.Title {
			return fmt.Errorf("A deck with this title already exists")
		}
	}

	// TODO: come up with id assignment solution when implementing delete
	// newDeck.ID = len(allDecks) + 1

	// if err := storage.db.Write(CollectionDeck, strconv.Itoa(newDeck.ID), newDeck); err != nil {
	// 	return err
	// }

	return nil
}

// FindDeck retrieves a deck by ID
func (storage *JSONStorage) FindDeck(deckID int) (Deck, error) {

	deck := Deck{}
	err := storage.db.Read(CollectionDeck, strconv.Itoa(deckID), &deck)

	return deck, err
}

// FindDecks retrieves all decks matching search query in payload
// TODO: though for now, it will just get them ALL, so empty arguments
func (storage *JSONStorage) FindDecks() ([]Deck, error) {
	var decks []Deck

	records, err := storage.db.ReadAll(CollectionDeck)

	if err != nil {
		return nil, err
	}

	for _, d := range records {
		var deck Deck

		if err := json.Unmarshal([]byte(d), &deck); err != nil {
			return decks, errors.Errorf("Failed to parse deck data from JSON: %s. Data: %s", err.Error(), d)
		}

		decks = append(decks, deck)
	}

	return decks, nil
}
