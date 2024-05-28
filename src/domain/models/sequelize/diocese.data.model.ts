const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../../config/db/db");

export class Diocese extends Model {
  declare id: number;
  declare name: string;
  declare holder: string;
}

Diocese.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    holder: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
  },
  {
    sequelize, // instacia de sequelize => base de datos
    modelName: "Diocese", // Nombre del modelo en sequelize
    tableName: "DioceseModel", // Nombre directo de la tabla
    timestamps: false,
  }
)
