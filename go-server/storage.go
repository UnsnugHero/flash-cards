package main

// StorageType will identify which storage method we want to use
type StorageType int

const (
	jsonStorageLocation = "./json-storage"

	// DatabaseFlashCards identifier for Flash Cards db
	DatabaseFlashCards = "flashcards"

	// CollectionDeck identifier for Deck collection key
	CollectionDeck = "decks"
	// CollectionCategory identifier for Category collection key
	CollectionCategory = "categories"

	// JSON StorageType def
	JSON StorageType = iota
	// Mongo StorageType def
	Mongo
)

// Storage declares method signatures to be implemented by storage type
type Storage interface {
	// Deck actions
	StoreDeck(newDeck *Deck) (string, error)
	FindDeck(deckID string) (Deck, error)
	FindDecks() ([]Deck, error)
	EraseDeck(deckID string) error
	AmendDeck(updatedDeck *Deck) error

	// Card Actions
	AddCardToDeck(newCard *Card, deckID string) (string, error)
	// AddCardsToDeck(newCards *[]Card, deckID string) error // should return anything else here?
	// EraseCard(cardID string, deckID string) error
	// AmendCard(updatedCard *Card, deckID string) error

	// Category Actions
	StoreCategory(newCategory *Category) (string, error)
	FindCategory(categoryID string) (Category, error)
	FindCategories() ([]Category, error)
	EraseCategory(categoryID string) error
	AmendCategory(updatedCategory *Category) error
}

// NewStorage takes in a storage type and returns a storage client instance of StorageType
func NewStorage(storageType StorageType) (Storage, error) {

	var storage Storage
	var err error

	switch storageType {
	case JSON:
		// initialize json memory storage
		// storage, err = NewJSONStorage(jsonStorageLocation)
	case Mongo:
		// initialize database storage
		storage, err = NewMongoStorage()
	}

	return storage, err
}
