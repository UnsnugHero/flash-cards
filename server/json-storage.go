package main

// this json db implementation runs off of the golang module golang-scribble
import scribble "github.com/nanobox-io/golang-scribble"

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
