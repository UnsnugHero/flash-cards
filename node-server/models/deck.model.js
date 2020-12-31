const mongoose = require('mongoose')

// deck schema for storing in db
const deckSchema = mongoose.Schema({
  name: { type: String, required: true },
  cards: { type: Array, default: [] },
  categories: { type: Array, default: [] }
})

// schema is definition for model.
// an instance of a model is a one to one mapping of a mongoDB document
//responsible for creating and reading documents from the mongoDB database.
// export for use out of this file
// plural form model name will be name of collection
module.exports = mongoose.model('Deck', deckSchema)
