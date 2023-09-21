'use strict';

const express = require('express');
const { PlayerModel, PlayerClassModel } = require('./models');
//const PlayerClassModel = require('./models/playerClass');

const createValidator = require('./error-handlers/createValidator');

const router = express.Router(); // this can be attached to an app with specific routes

router.get('/player', async (req, res) => {
  let records = await PlayerModel.findAll();
  res.status(200).send({ results: records });
});

router.post('/player', async (req, res, next) => {
  const blankProps = createValidator(req.body, req.path);

  if (!blankProps) {
    let record = await PlayerModel.create(req.body);
    res.status(200).send(record);
  } else {
    console.log(blankProps);
    next(blankProps)
  }
});

router.patch('/player/:id', async (req, res) => {
  let id = req.params.id;
  let recordToUpdate = await PlayerModel.findByPk(id);
  recordToUpdate.update(req.body);
  await recordToUpdate.save();

  console.log('UPDATED RECORD', recordToUpdate);
  res.status(200).json(recordToUpdate);
}); // route parameter => required value attached to the URI

router.delete('/player/:id', async (req, res) => {
  let id = req.params.id;
  // let record = await PokemonModel.findByPk(id);
  await PlayerModel.destroy({
    where: { id }
  });

  res.status(204).send('deleted');
});

// playerClass routes

router.get('/playerclass', async (req, res) => {
  let records = await PlayerClassModel.findAll();
  res.status(200).send({ results: records });
});

router.post('/playerclass', async (req, res, next) => {
  const blankProps = createValidator(req.body, req.path);
  
  if (!blankProps) {
    let record = await PlayerClassModel.create(req.body);
    res.status(200).send(record);
  } else {
    next(blankProps)
  }
});

router.patch('/playerclass/:id', async (req, res) => {
  let id = req.params.id;
  let recordToUpdate = await PlayerClassModel.findByPk(id);
  recordToUpdate.update(req.body);
  await recordToUpdate.save();

  console.log('UPDATED RECORD', recordToUpdate);
  res.status(200).json(recordToUpdate);
}); // route parameter => required value attached to the URI

router.delete('/playerclass/:id', async (req, res) => {
  let id = req.params.id;
  await PlayerClassModel.destroy({
    where: { id }
  });

  res.status(204).send('deleted');
});

module.exports = router;