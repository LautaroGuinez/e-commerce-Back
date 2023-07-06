const db = require("../config/db");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

class User extends Sequelize.Model {
  async hash(password, salt) {
    return bcrypt.hash(password, salt);
  }

  async validatePassword(password) {
    const newHash = await this.hash(password, this.salt);
    return newHash === this.password;
  }
}

User.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    super_admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    salt: {
      type: Sequelize.STRING,
    },
  },
  { sequelize: db, modelName: "user" }
);

User.beforeCreate(async (user) => {
  const saltRounds = 8;

  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
});
module.exports = User;
