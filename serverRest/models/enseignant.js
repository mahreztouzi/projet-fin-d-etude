"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Enseignant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Enseignant.belongsTo(models.Users, { foreignKey: "userId" });
      Enseignant.hasMany(models.Cours, {
        foreignKey: "idEnseignant",
      });
      Enseignant.hasMany(models.Test, {
        foreignKey: "idEnseignant",
      });
      Enseignant.hasMany(models.Td, {
        foreignKey: "idEnseignant",
      });
    }
  }
  Enseignant.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,

      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Enseignant",
    }
  );
  return Enseignant;
};
