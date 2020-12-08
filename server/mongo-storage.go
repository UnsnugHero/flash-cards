package main

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

//
// DECK METHODS
//

// StoreDeck stores a new deck into the database
func (storage *MongoStorage) StoreDeck(newDeck *Deck) (string, error) {
	// check storage to see if a deck with this title already exists
	allDecks, err := storage.FindDecks()

	if err != nil {
		return "", err
	}

	for _, deck := range allDecks {
		if newDeck.Title == deck.Title {
			return "", fmt.Errorf("A decks with this title already exists")
		}
	}

	// get database collection
	collection := getCollection(storage, CollectionDeck)

	insertResult, err := collection.InsertOne(context.TODO(), *newDeck)

	if err != nil {
		return "", fmt.Errorf("Error inserting deck into the database")
	}

	// get the object id of the item inserted into the database
	oid := insertResult.InsertedID.(primitive.ObjectID)

	return oid.Hex(), nil
}

// FindDeck retrieves a deck by ID
func (storage *MongoStorage) FindDeck(deckID string) (Deck, error) {

	deck := Deck{}

	collection := getCollection(storage, CollectionDeck)

	// find by mongo assigned object id
	objID, _ := primitive.ObjectIDFromHex(deckID)
	cursorDeck := collection.FindOne(context.TODO(), bson.M{"_id": objID})

	// attempt decode
	err := cursorDeck.Decode(&deck)
	deck.ID = deckID

	return deck, err
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

//
//  CARD METHODS
//

//
// CATEGORY METHODS
//

// StoreCategory handles storing a new category into the database
func (storage *MongoStorage) StoreCategory(newCategory *Category) (string, error) {
	// TODO: implement find category to do a check to see if a category
	// with this name already exists in the database as no duplicates allowed

	collection := getCollection(storage, CollectionCategory)

	insertResult, err := collection.InsertOne(context.TODO(), *newCategory)

	if err != nil {
		return "", fmt.Errorf("Error inserting category into the database")
	}

	oid := (insertResult.InsertedID.(primitive.ObjectID))

	return oid.Hex(), nil
}

// FindCategory finds a category by ID
func (storage *MongoStorage) FindCategory(categoryID string) (Category, error) {

	// declare a new category to populate
	category := Category{}

	// get our collection
	collection := getCollection(storage, CollectionCategory)

	// get a mongo compatible id
	objID, _ := primitive.ObjectIDFromHex(categoryID)
	findResult := collection.FindOne(context.TODO(), bson.M{"_id": objID})

	// attempt decode and store in category variable
	err := findResult.Decode(&category)
	category.ID = categoryID

	return category, err
}

//
// HELPERS
//

// gets which collection to use from database
// hardcoded db in cluster for now, dont think
// itll be using any others
func getCollection(storage *MongoStorage, collection string) *mongo.Collection {
	return storage.db.Database(DatabaseFlashCards).Collection(collection)
}
