const mongoose = require('mongoose')

// deck schema for storing in db
const deckSchema = mongoose.Schema({
  name: { type: String, required: true },
  cards: { type: Array, default: [] },
  categories: { type: Array, default: [] }
})

// schema is definition for model
// export for use out of this file
module.exports = mongoose.model('Deck', deckSchema)
