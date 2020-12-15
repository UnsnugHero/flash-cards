// TODO: I see an opportunity in this file to write generic CRUD methods where you can just pass in
// the data type you want (Deck, Category, etc ...) to save on all the repitition

/**

ERROR CAES FOR UPDATE REQUEST

name is empty
id doesnt match a pre-existing one


*/

package main

import (
	"context"
	"fmt"
	"log"
	"reflect"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	// string constants
	errorCheckingDuplicate = "Error checking if %s %s already exists"
	errorDuplicateExists   = "A %s with this %s already exists"
	errorUpdatingNoMatch   = "No %s matched the ID in update query"
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

	storage.db = dbClient

	return storage, nil
}

//
// DECK METHODS
//

// StoreDeck stores a new deck into the database
func (storage *MongoStorage) StoreDeck(newDeck *Deck) (string, error) {

	// get database collection
	collection := getCollection(storage, CollectionDeck)

	// check if deck with given name name already exists
	if doesRecordExist, err := doesRecordExistByField(collection, "name", newDeck.Name); err != nil {
		return "", fmt.Errorf(errorCheckingDuplicate, "deck", "name")
	} else if doesRecordExist {
		// category already exists
		return "", fmt.Errorf(errorDuplicateExists, "deck", "name")
	}

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

// EraseDeck deletes a deck by id
func (storage *MongoStorage) EraseDeck(deckID string) error {

	//get collection
	collection := getCollection(storage, CollectionDeck)

	// get mongo compatible id
	objID, _ := primitive.ObjectIDFromHex(deckID)

	deleteResult, err := collection.DeleteOne(context.TODO(), bson.M{"_id": objID})

	if deleteResult.DeletedCount == 0 {
		err = fmt.Errorf("No deck matched the given ID")
	}

	return err
}

//
//  CARD METHODS
//

//
// CATEGORY METHODS
//

// StoreCategory handles storing a new category into the database, returns id of stored category
func (storage *MongoStorage) StoreCategory(newCategory *Category) (string, error) {

	collection := getCollection(storage, CollectionCategory)

	// check if category with given name name already exists
	if doesRecordExist, err := doesRecordExistByField(collection, "name", newCategory.Name); err != nil {
		return "", fmt.Errorf("Error checking if category name already exists")
	} else if doesRecordExist {
		// category already exists
		return "", fmt.Errorf("A category with this name already exists")
	}

	fmt.Println(*newCategory)

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

// FindCategories finds all categories, later support finding by a given filter
func (storage *MongoStorage) FindCategories() ([]Category, error) {
	var categories []Category

	collection := getCollection(storage, CollectionCategory)

	records, err := collection.Find(context.TODO(), bson.D{})

	if err != nil {
		return nil, err
	}

	for records.Next(context.TODO()) {
		var category Category
		err = records.Decode(&category)

		if err != nil {
			log.Fatal("Error decoding decument", err)
			return nil, err
		}

		categories = append(categories, category)
	}

	return categories, nil
}

// EraseCategory storage method for deleting category from database
func (storage *MongoStorage) EraseCategory(categoryID string) error {
	// get our collection
	collection := getCollection(storage, CollectionCategory)

	// get a mongo compatible id
	objID, _ := primitive.ObjectIDFromHex(categoryID)

	// delete category matching ID
	deleteResult, err := collection.DeleteOne(context.TODO(), bson.M{"_id": objID})

	if deleteResult.DeletedCount == 0 {
		err = fmt.Errorf("No category matched the given ID")
	}

	return err
}

// AmendCategory updates a record with category in request given non-empty name and matching ID
func (storage *MongoStorage) AmendCategory(updatedCategory *Category) error {

	// get collection
	collection := getCollection(storage, CollectionCategory)

	// get a mongo compatible id
	objID, _ := primitive.ObjectIDFromHex(updatedCategory.ID)

	// filter used to match a document. If filter matches no documents, the results will contain a MatchedCount of 0
	// E represents a BSON element for a D. It is usually used inside a D.
	filter := bson.D{primitive.E{Key: "_id", Value: objID}}

	// set document update data
	update := bson.D{{Key: "$set",
		Value: bson.D{
			{Key: "name", Value: updatedCategory.Name},
			{Key: "associatedDecks", Value: updatedCategory.AssociatedDecks},
		},
	}}

	// try updating the document with category sent on request
	updateResult, err := collection.UpdateOne(context.TODO(), filter, update)

	if err != nil {
		return err
	}

	if updateResult.MatchedCount == 0 {
		err = fmt.Errorf(errorUpdatingNoMatch, "categories")
	}

	return err
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

// checks if records in collection have a field with given string value
func doesRecordExistByField(collection *mongo.Collection, fieldKey string, fieldValue string) (bool, error) {

	records, err := collection.Find(context.TODO(), bson.D{})

	if err != nil {
		return false, err
	}

	for records.Next(context.TODO()) {

		// primitive.D is an unordered representation of a BSON document. If order did matter here, we would use primitive.D which is ordered.
		// this type is handled as a regular map when encoding and decoding
		var record primitive.M
		err = records.Decode(&record)

		if err != nil {
			log.Fatal("Error decoding document while checking for pre-existing field", err)
			return false, err
		}

		// fieldValue must be type string, check if value at fieldKey in object is string, if its not, err out
		if record[fieldKey] != nil && reflect.TypeOf(record[fieldKey]) != reflect.TypeOf(fieldValue) {
			err = fmt.Errorf("Incompatible types detected while checking for pre-existing record using key: %s", fieldKey)
			return false, err
		}

		if record[fieldKey] == fieldValue {
			return true, nil
		}
	}

	return false, nil
}
