const { Sequelize } = require("sequelize");
const db = require("../config/db");

class Cards extends Sequelize.Model {}

Cards.init(
  {
  
    number: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    holderName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    expirationDate: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    idUser: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "cards" }
);

module.exports = Cards;
