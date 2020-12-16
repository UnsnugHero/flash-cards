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

	router.Use(corsMiddleware())

	// Deck routes
	router.GET("/decks/:id", GetDeck)
	router.GET("/decks", GetDecks)
	router.POST("/decks", AddDeck)
	router.PUT("/decks", UpdateDeck)
	router.DELETE("/decks/:id", DeleteDeck)

	// Card routes
	// card routes will have the base /decks prepended
	// as well as the deck id necessary as cards are
	// associated to decks
	router.POST("decks/:id/cards", AddCard)
	router.POST("decks/:id/bulkAddCards", AddCards)
	router.PUT("decks/:id/cards/:cardId", UpdateCard)
	router.DELETE("decks/:id/cards", DeleteCard)

	// Category routes
	router.GET("/categories/:id", GetCategory)
	router.GET("/categories", GetCategories)
	router.POST("/categories", AddCategory)
	router.PUT("/categories", UpdateCategory)
	router.DELETE("/categories/:id", DeleteCategory)

	// listen and serve on port 8080 default
	router.Run()
}

func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, DELETE, GET, PUT, OPTIONS")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
