'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const Player = require('./player.js');
const PlayerClass = require('./playerClass');

const SQL_CONNECTION_STRING = process.env.SQL_CONNECTION_STRING || 'sqlite:memory:';

const sequelize = new Sequelize(SQL_CONNECTION_STRING); // this is a singleton.

module.exports = {
  sequelize,
  PlayerModel: Player(sequelize, DataTypes),
  PlayerClass: PlayerClass(sequelize, DataTypes)
}