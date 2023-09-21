const PlayerModel = (sequelize, DataTypes) => sequelize.define('Player', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  
  module.exports = PlayerModel;