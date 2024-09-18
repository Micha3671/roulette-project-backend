const { DataTypes } = require("sequelize");
const casinoSequelize = require("../setup/database");

// Define the Todo model

const UserModel = casinoSequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    dob: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },

  {
    tableName: "Users",
    defaultScope: { attributes: { exclude: ["password"] } },
    scopes: {
      allData: { attributes: { exclude: [] } },
    },
  },
);

module.exports = UserModel;
