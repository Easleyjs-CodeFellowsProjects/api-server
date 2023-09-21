const PlayerClassModel = (sequelize, DataTypes) => sequelize.define('PlayerClass', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  
  module.exports = PlayerClassModel;