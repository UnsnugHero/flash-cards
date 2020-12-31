// external imports
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// internal imports
const DeckHandlers = require("./handlers/deck.handlers");

// constants
const PORT = process.env.PORT || 8080;

// create the express app
const app = express();

// connect to the database through mongoose
const uri =
  "mongodb+srv://mjc578:phhpVUaYoQ5Yl2Du@practice.ah9yt.mongodb.net/flashcards?retryWrites=true&w=majority";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connection established");
  })
  .catch(() => {
    // TODO: error handling here?
    console.error("Error connecting to database");
  });

// handle CORS policy
// let any client access server resources
// with these headers and http request methods
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, DELETE, OPTIONS"
  );
  next();
});

// middleware for parsing request bodies
// adds a field 'body; to 'req' objects
app.use(bodyParser.json());

// DECK ROUTES
app.get("/decks", DeckHandlers.GetDecks);
app.post("/decks", DeckHandlers.AddDeck);

// CATEGORY ROUTES

// set the port to listen on
app.listen(PORT);

module.exports = app;
