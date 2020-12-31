// external imports
const express = require('express')

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

// attach middleware function
app.use('/neenis', (req, res, next) => {
  res.send('Neenis Kareneenis');
});

// set the port to listen on
app.listen(PORT);

module.exports = app;
