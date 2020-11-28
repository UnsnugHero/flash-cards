package main

// StorageType will identify which storage method we want to use
type StorageType int

const (
	jsonStorageLocation = "./json-storage"

	// iota will enumerate for our constants, so JSON = 0, Database = 1...

	// JSON StorageType def
	JSON StorageType = iota
	// Database StorageType def
	Database
)

// Storage declares method signatures to be implemented by storage type
type Storage interface {
	// Deck actions
	StoreDeck(newDeck Deck) error
	FindDeck() (Deck, error)
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
	case Database:
		// initialize database storage here
	}

	return storage, err
}
