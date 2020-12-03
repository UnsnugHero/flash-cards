package main

import (
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

/****************
CARD HANDLERS
****************/

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
	deckID, err := strconv.Atoi(ctx.Param("id"))

	// handle bad ID request error
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": fmt.Sprintf("%s is not a valid Deck ID, it must be a number.", ctx.Param("id")),
		})
		return
	}

	// retrieve deck from DB via ID
	deck, err := storage.FindDeck(deckID)

	// error retrieving deck from storage\
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": fmt.Sprintf("Error retrieving deck with id %d from storage", deckID),
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
CATEGORY HANDLERS
****************/
