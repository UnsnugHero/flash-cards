// external imports
const express = require('express')
const bodyParser = require('body-parser')

// internal imports
const Deck = require('./models/deck')

const PORT = process.env.PORT || 8080;

// create the express app
const app = express();

// handle CORS policy
// let any client access server resources
// with these headers and http request methods
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
  next()
})

// middleware for parsing request bodies
// adds a field 'body; to 'req' objects
app.use(bodyParser.json())

// mock post endpoint for testing
app.post('/mockpost', (req, res, next) => {
  const deck = new Deck({
    name: req.body.name
  })

  res.status(201).json({
    message: 'Nice!!!',
    data: deck
  })
})

// set the port to listen on
app.listen(PORT);

module.exports = app;
