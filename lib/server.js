'use strict';

const express = require('express');
const cors = require('cors');
const app = express(); // singleton -> there can only be one

const playerRouter = require('./router');
const serverError = require('./error-handlers/500')
const notFoundError = require('./error-handlers/404')

app.use(cors());
app.use(express.json());
app.use('/api', playerRouter);

// error handlers
app.use(serverError);
app.use('/*', notFoundError);

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => {
      console.log('REST server is running!');
    });
  }
}