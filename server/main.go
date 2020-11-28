package main

import (
	"log"

	"github.com/gin-gonic/gin"
)

// package available database
var database Storage

func main() {

	var err error

	// declare our storage
	// for now, using json to store, later mongo
	database, err = NewStorage(JSON)

	if err != nil {
		log.Fatal(err)
	}

	// declare our router. Default() returns a new Engine instance. As opposed to using New(),
	// Default() attaches Logger and Recovery middleware whereas New() has no middlewhere
	router := gin.Default()

	// Deck routes
	router.GET("/decks", GetDecks)
	router.GET("/decks/:id", GetDeck)
	router.POST("/decks", AddDeck)

	// listen and serve on port 8080 default
	router.Run()
}
