package main

import (
	"log"

	"github.com/gin-gonic/gin"
)

// package available database
var storage Storage

func main() {

	var err error

	// declare our storage
	storage, err = NewStorage(Mongo)

	if err != nil {
		log.Fatal(err)
		return
	}

	// declare our router. Default() returns a new Engine instance. As opposed to using New(),
	// Default() attaches Logger and Recovery middleware whereas New() has no middlewhere
	router := gin.Default()

	// Deck routes
	router.GET("/decks/:id", GetDeck)
	router.GET("/decks", GetDecks)
	router.POST("/decks", AddDeck)
	router.PUT("/decks", UpdateDeck)
	router.DELETE("/decks/:id", DeleteDeck)

	// Card routes

	// Category routes
	router.GET("/categories/:id", GetCategory)
	router.GET("/categories", GetCategories)
	router.POST("/categories", AddCategory)
	router.PUT("/categories", UpdateCategory)
	router.DELETE("/categories/:id", DeleteCategory)

	// listen and serve on port 8080 default
	router.Run()
}
