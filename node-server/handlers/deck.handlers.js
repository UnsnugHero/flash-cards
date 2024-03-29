// external imports
const mongoose = require("mongoose");

// internal imports
const Deck = require("../models/deck.model");

// gets a single id by id
async function GetDeck(req, res) {
  try {
    const deckId = req.params.deckId;
    const deck = await Deck.findById(deckId).exec();

    res.status(200).json({
      message: "Deck retrieved",
      data: deck,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving deck",
      error,
    });
  }
}

// gets all decks
// TODO: limit this somehow, probably by page size/ by filter
// should it be different from a search?
async function GetDecks(req, res) {
  try {
    const decks = await Deck.find({});
    res.status(200).json({
      message: "Decks retrieved",
      data: decks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving decks",
      error,
    });
  }
}

// adds a single deck, does not expect anything on body besides the deck name
async function AddDeck(req, res) {
  const deck = new Deck({
    name: req.body.name,
  });

  try {
    const deckCreated = await deck.save();
    res.status(201).json({
      message: "Deck succesfully created",
      data: deckCreated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating deck",
    });
  }
}

// edits a deck, used for adding cards, adding categories
// and in general editing deck information
async function EditDeck(req, res) {
  // check for id on request, err if none
  const query = { _id: req.body.id };

  if (!query._id) {
    res.status(400).json({
      message: "Error updating deck",
      error: "Request must include id",
    });
    return;
  }

  // check if name of deck already exists
  // barring the current one of course if
  // the name wasn't edited at all
  const deckName = req.body.name;
  try {
    const findNameResult = await Deck.find({ name: deckName });

    if (
      findNameResult.filter((deck) => deck._id.equals(req.body.id)).length === 0
    ) {
      res.status(400).json({
        message: "Error updating deck",
        error: "A deck with this title already exists",
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      message: "Error validating request body",
      error,
    });
  }

  // update deck
  // TODO: format set an updateBody instead of just taking the request body
  try {
    const updateResult = await Deck.findOneAndUpdate(query, req.body, {
      new: true,
      upsert: false,
    });
    res.status(200).json({
      message: "Deck succesfully updated",
      data: updateResult,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating deck",
      error,
    });
  }
}

// deletes a deck by id
async function DeleteDeck(req, res) {
  const deckId = req.params.deckId;

  try {
    await Deck.deleteOne({ _id: deckId });

    res.status(200).json({
      message: "Deck succesfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting deck",
      error,
    });
  }
}

module.exports = {
  GetDeck,
  GetDecks,
  AddDeck,
  EditDeck,
  DeleteDeck,
};
