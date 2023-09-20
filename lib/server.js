'use strict';

const express = require('express');
const cors = require('cors');
const app = express(); // singleton -> there can only be one

const playerRouter = require('./router.js');

app.use(cors());
app.use(express.json());
app.use('/api', playerRouter);

// errorHandlers go down

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => {
      console.log('REST server is running!');
    });
  }
}