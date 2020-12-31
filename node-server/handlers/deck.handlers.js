// external imports
const mongoose = require("mongoose");

// internal imports
const Deck = require("../models/deck.model");

// gets all decks
// TODO: limit this somehow, probably by page size/ by filter
// should it be different from a search?
function GetDecks(req, res) {
  Deck.find({})
    .then((decks) => {
      res.status(200).json({
        message: "Decks retrieved",
        data: decks,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error retrieving decks",
        error,
      });
    });
}

// adds a single deck, does not expect anything on body besides the deck name
function AddDeck(req, res) {
  const deck = new Deck({
    name: req.body.name,
  });

  deck.save();

  res.status(201).json({
    message: "Deck succesfully created",
    data: deck,
  });
}

module.exports = {
  GetDecks,
  AddDeck,
};
