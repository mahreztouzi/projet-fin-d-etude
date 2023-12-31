"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Apprenant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Apprenant.belongsTo(models.Users, { foreignKey: "userId" });
    }
  }
  Apprenant.init(
    {
      nom: DataTypes.STRING,
      prenom: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Apprenant",
    }
  );
  return Apprenant;
};
