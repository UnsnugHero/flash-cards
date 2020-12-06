package main

// StorageType will identify which storage method we want to use
type StorageType int

const (
	jsonStorageLocation = "./json-storage"

	// DatabaseFlashCards identifier for Flash Cards db
	DatabaseFlashCards = "flashcards"

	// CollectionDeck identifier for Deck JSON key
	CollectionDeck = "decks"

	// JSON StorageType def
	JSON StorageType = iota
	// Mongo StorageType def
	Mongo
)

// Storage declares method signatures to be implemented by storage type
type Storage interface {
	// Deck actions
	StoreDeck(newDeck Deck) error
	FindDeck(deckID int) (Deck, error)
	FindDecks() ([]Deck, error)

	// Card Actions

	// Category Actions
}

// NewStorage takes in a storage type and returns a storage client instance of StorageType
func NewStorage(storageType StorageType) (Storage, error) {

	var storage Storage
	var err error

	switch storageType {
	case JSON:
		// initialize json memory storage
		storage, err = NewJSONStorage(jsonStorageLocation)
	case Mongo:
		// initialize database storage
		storage, err = NewMongoStorage()
	}

	return storage, err
}
