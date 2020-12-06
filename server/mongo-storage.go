package main

import (
	"context"
	"fmt"
	"log"
	"math/rand"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// MongoStorage is a struct containing our mongo db client
// and implements the Storage interface for storing data
type MongoStorage struct {
	db *mongo.Client
}

func getClient() (*mongo.Client, error) {

	// configure database client to use our databse URI
	// the cluster's name is practice with databases inside it
	clientURI := "mongodb+srv://mjc578:phhpVUaYoQ5Yl2Du@practice.ah9yt.mongodb.net/flashcards?retryWrites=true&w=majority"
	clientOptions := options.Client().ApplyURI(clientURI)
	client, err := mongo.NewClient(clientOptions)

	// error configuring client
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	// connect to database
	err = client.Connect(context.Background())

	// error connecting to database
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	return client, nil
}

// NewMongoStorage returns a new instance of db client
func NewMongoStorage() (*MongoStorage, error) {
	storage := new(MongoStorage)

	// establish connection to db and get client
	dbClient, err := getClient()

	if err != nil {
		return nil, err
	}

	// ping check?

	storage.db = dbClient

	return storage, nil
}

// StoreDeck stores a new deck into the database
func (storage *MongoStorage) StoreDeck(newDeck Deck) error {
	// check storage to see if a deck with this title already exists
	// allDecks, err := storage.FindDecks()

	// if err != nil {
	// 	return err
	// }

	// for _, deck := range allDecks {
	// 	if newDeck.Title == deck.Title {
	// 		return fmt.Errorf("A decks with this title already exists")
	// 	}
	// }

	// Come up with better solution when delete implemented
	// TODO: fix when implementing FindDecks
	// newDeck.ID = len(allDecks) + 1
	newDeck.ID = rand.Int()

	// get database collection
	collection := getCollection(storage, CollectionDeck)

	insertResult, err := collection.InsertOne(context.TODO(), newDeck)

	if err != nil {
		return fmt.Errorf("Error inserting deck into the database")
	}

	fmt.Println(insertResult)

	return nil
}

// FindDeck retrieves a deck by ID
func (storage *MongoStorage) FindDeck(deckID int) (Deck, error) {
	return Deck{}, nil
}

// FindDecks retrieves all decks matching search query in payload
// TODO: though for now, it will just get them ALL, so empty arguments
func (storage *MongoStorage) FindDecks() ([]Deck, error) {
	var decks []Deck

	// get our necessary collection
	collection := getCollection(storage, CollectionDeck)

	// here we pass bson.D{} to search all, ideally later on
	// it will be whatever filter we need and defaults to bson.D{}
	// if there is no filter specified
	records, err := collection.Find(context.TODO(), bson.D{})

	if err != nil {
		return nil, err
	}

	// the return value is of type Cursor, which contains the BSON bytes
	// of the retrieves document, we need to decode it to send back on response
	for records.Next(context.TODO()) {
		var deck Deck
		err = records.Decode(&deck)

		if err != nil {
			log.Fatal("Error decoding decument", err)
			return nil, err
		}

		decks = append(decks, deck)
	}

	return decks, nil
}

// gets which collection to use from database
// hardcoded db in cluster for now, dont think
// itll be using any others
func getCollection(storage *MongoStorage, collection string) *mongo.Collection {
	return storage.db.Database(DatabaseFlashCards).Collection(collection)
}
