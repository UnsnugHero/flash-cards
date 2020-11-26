package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {

	// declare our router. Default() returns a new Engine instance. As opposed to using New(),
	// Default() attaches Logger and Recovery middleware whereas New() has no middlewhere
	router := gin.Default()

	// GET routes
	router.GET("/hello", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "Hello!!",
		})
	})

	// listen and serve on port 8080 default
	router.Run()
}
