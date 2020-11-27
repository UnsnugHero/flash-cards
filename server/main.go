package main

import (
	"github.com/gin-gonic/gin"
)

func main() {

	// declare our router. Default() returns a new Engine instance. As opposed to using New(),
	// Default() attaches Logger and Recovery middleware whereas New() has no middlewhere
	router := gin.Default()

	// Deck routes
	router.GET("/decks/:id", GetDeck)
	router.POST("/decks", AddDeck)

	// listen and serve on port 8080 default
	router.Run()
}
