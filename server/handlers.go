package main

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

/****************
DECK HANDLERS
****************/

// AddDeck adds a deck with title and optional categories
func AddDeck(ctx *gin.Context) {

	// declare a new deck to bind body to
	newDeck := Deck{}

	// bind the request body to the Deck struct
	err := ctx.Bind(&newDeck)

	// check for error
	if err != nil {
		ctx.JSON(http.StatusBadRequest, "Error while parsing new deck data: "+err.Error())
		return
	}

	// check if missing title, as title is necessary.
	if strings.TrimSpace(newDeck.Title) == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "Deck title is a required field for adding a deck.",
		})
		return
	}

	// good request, try saving in storage
	err = storage.StoreDeck(newDeck)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": fmt.Sprintf("An error occured saving this deck: %s", err.Error()),
		})
		return
	}

	// Send response back of inserted data
	ctx.JSON(http.StatusOK, newDeck)
}

// GetDeck gets a single deck by its ID
func GetDeck(ctx *gin.Context) {
	// get deck id via path param
	deckID := ctx.Param("id")

	// handle bad ID request error
	if deckID == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": fmt.Sprintf("Request does not contain a deck ID!"),
		})
		return
	}

	// retrieve deck from DB via ID
	deck, err := storage.FindDeck(deckID)

	// error retrieving deck from storage\
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": fmt.Sprintf("Error retrieving deck with id %s from storage: %s", deckID, err),
		})
		return
	}

	// return deck data as JSON
	ctx.JSON(http.StatusOK, gin.H{
		"data":    deck,
		"message": "Deck retrieved!",
	})
}

// GetDecks returns all decks based of search query (returns all decks for now)
// planning to evolve this to take in a query body to do a deck search
// should deck search be a separate method?
func GetDecks(ctx *gin.Context) {

	decks, err := storage.FindDecks()

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": fmt.Sprintf("Error retrieving decks: %s.", err),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"records": decks,
		"message": "Decks retrieved!",
	})
}

/****************
CARD HANDLERS
****************/

/****************
CATEGORY HANDLERS
****************/

// AddCategory is the handler for the AddCategory route that handles incoming add card request and adds new card to database
func AddCategory(ctx *gin.Context) {

	// declare a new deck to bind body to
	newCategory := Category{}

	// bind the request body to the Deck struct
	err := ctx.Bind(&newCategory)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "Error parsing request body",
		})
		return
	}

	if strings.TrimSpace(newCategory.Name) == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "Error: Name is required for new category.",
		})
		return
	}

	// good request, try saving in storage
	objectID, err := storage.StoreCategory(&newCategory)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": fmt.Sprintf("An error occured saving this deck: %s", err.Error()),
		})
		return
	}

	newCategory.ID = objectID

	ctx.JSON(http.StatusOK, gin.H{
		"data": newCategory,
	})
}
