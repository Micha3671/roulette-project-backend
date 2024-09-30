const { DataTypes } = require("sequelize");
const casinoSequelize = require("../setup/database");

// Define the Todo model

const HighscoreModel = casinoSequelize.define(
  "Highscore",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gameId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    highscore: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { tableName: "Highscores" },
);

module.exports = HighscoreModel;
