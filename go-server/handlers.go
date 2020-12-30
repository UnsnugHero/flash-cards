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

// AddDeck adds a deck with name and optional categories
func AddDeck(ctx *gin.Context) {

	// declare a new deck to bind body to
	newDeck := Deck{}

	// bind the request body to the Deck struct
	err := ctx.Bind(&newDeck)

	// set categories and cards as empty arrays since they wont be sent on this request anyway
	newDeck.Categories = []Category{}
	newDeck.Cards = []Card{}

	// check for error
	if err != nil {
		ctx.JSON(http.StatusBadRequest, "Error while parsing new deck data: "+err.Error())
		return
	}

	// make sure request does not include an ID
	if strings.TrimSpace(newDeck.ID) != "" {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "Add request should not include an ID",
		})
		return
	}

	// check if missing name, as name is necessary.
	if strings.TrimSpace(newDeck.Name) == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "Deck name is a required field for adding a deck.",
		})
		return
	}

	// good request, try saving in storage
	objectID, err := storage.StoreDeck(&newDeck)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": fmt.Sprintf("An error occured saving this deck: %s", err.Error()),
		})
		return
	}

	// attach ID onto response object
	newDeck.ID = objectID

	// Send response back of inserted data
	ctx.JSON(http.StatusOK, newDeck)
}

// DeleteDeck deletes deck by id
func DeleteDeck(ctx *gin.Context) {

	// get id from param
	deckID := ctx.Param("id")

	// check if id empty
	if deckID == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": fmt.Sprintf("Request does not contain a deck ID!"),
		})
		return
	}

	err := storage.EraseDeck(deckID)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": fmt.Sprintf("Errordeleting deck: %s", err),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "Deck successfully deleted!",
	})
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

// UpdateDeck handler for updating a deck
func UpdateDeck(ctx *gin.Context) {
	// declare a new deck to bind body to
	updatedDeck := Deck{}

	// bind the request body to the Deck struct
	err := ctx.Bind(&updatedDeck)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "Error parsing request body",
		})
		return
	}

	if strings.TrimSpace(updatedDeck.Name) == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "Error: Name is required for updating a deck.",
		})
		return
	}

	// good request, attempt update
	err = storage.AmendDeck(&updatedDeck)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": fmt.Sprintf("Error updating deck: %s", err),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"data":    updatedDeck,
		"message": "Deck succesfully updated!",
	})
}

/****************
CARD HANDLERS
****************/

// AddCard adds a single card to a deck
func AddCard(ctx *gin.Context) {

	deckID := ctx.Param("id")

	newCard := Card{}

	err := ctx.Bind(&newCard)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "Error parsing request body",
		})
		return
	}

	// make sure request does not include an ID and ensure it has an answer + prompt
	if strings.TrimSpace(newCard.ID) != "" {
		ctx.JSON(http.StatusBadRequest, "Add request should not include an ID")
		return
	} else if strings.TrimSpace(newCard.Answer) == "" || strings.TrimSpace(newCard.Prompt) == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "Error: Answer and/or Prompt are required for new card",
		})
		return
	}

	objID, err := storage.AddCardToDeck(&newCard, deckID)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": fmt.Errorf("Error adding new card: %s", err),
		})
		return
	}

	newCard.ID = objID

	ctx.JSON(http.StatusOK, newCard)
}

// AddCards adds a bulk number of cards to a deck
func AddCards(ctx *gin.Context) {

}

// UpdateCard updates a single card for a deck
func UpdateCard(ctx *gin.Context) {

}

// DeleteCard deletes a single card for a deck
func DeleteCard(ctx *gin.Context) {

}

/****************
CATEGORY HANDLERS
****************/

// AddCategory is the handler for the AddCategory route that handles incoming add card request and adds new card to database
func AddCategory(ctx *gin.Context) {

	// declare a new category to bind body to
	newCategory := Category{}

	// bind the request body to the Category struct
	err := ctx.Bind(&newCategory)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "Error parsing request body",
		})
		return
	}

	// make sure request does not include an ID
	if strings.TrimSpace(newCategory.ID) != "" {
		ctx.JSON(http.StatusBadRequest, "Add request should not include an ID")
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

	ctx.JSON(http.StatusOK, newCategory)
}

// DeleteCategory deletes a category from the database by ID
func DeleteCategory(ctx *gin.Context) {

	// get id from param
	categoryID := ctx.Param("id")

	// handle bad ID request error
	if categoryID == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": fmt.Sprintf("Request does not contain a category ID!"),
		})
		return
	}

	// try to delete category with id from db
	err := storage.EraseCategory(categoryID)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": fmt.Sprintf("Error deleting category: %s", err),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "Category successfully deleted!",
	})
}

// GetCategory retrieves a single category by ID from the database
// TODO: obviously alot of repeated code here, maybe could make a function that is a base Get function template
// and you pass in a string of type you are getting and maybe storage function?
func GetCategory(ctx *gin.Context) {
	// get category id via path param
	categoryID := ctx.Param("id")

	// handle bad ID request error
	if categoryID == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": fmt.Sprintf("Request does not contain a category ID!"),
		})
		return
	}

	// retrieve category from DB via ID
	category, err := storage.FindCategory(categoryID)

	// error retrieving category from storage\
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": fmt.Sprintf("Error retrieving category with id %s from storage: %s", categoryID, err),
		})
		return
	}

	// return deck data as JSON
	ctx.JSON(http.StatusOK, gin.H{
		"data":    category,
		"message": "Category retrieved!",
	})
}

// GetCategories retrieves all categories from database, in future to support searching by filter
func GetCategories(ctx *gin.Context) {
	categories, err := storage.FindCategories()

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": fmt.Sprintf("Error retrieving categories: %s.", err),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"records": categories,
		"message": "Categories retrieved!",
	})
}

// UpdateCategory updates a single catgory
func UpdateCategory(ctx *gin.Context) {
	// declare a new category to bind body to
	updatedCategory := Category{}

	// bind the request body to the Category struct
	err := ctx.Bind(&updatedCategory)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "Error parsing request body",
		})
		return
	}

	if strings.TrimSpace(updatedCategory.Name) == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "Add request should not include an ID",
		})
		return
	}

	// good request, attempt update
	err = storage.AmendCategory(&updatedCategory)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": fmt.Sprintf("Error updating category: %s", err),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"data":    updatedCategory,
		"message": "Category succesfully updated!",
	})
}
