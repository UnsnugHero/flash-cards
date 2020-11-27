package main

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

/****************
CARD HANDLERS
****************/

/****************
DECK HANDLERS
****************/

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

	// return deck data as JSON
	ctx.JSON(http.StatusOK, gin.H{
		"id": deckID,
	})
	return
}

/****************
CATEGORY HANDLERS
****************/
