const { DataTypes, UUIDV4 } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "activity",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false, //No lo pide el readme
      },
      img: {
        type: DataTypes.TEXT,
        defaultValue:
          "https://acegif.com/wp-content/uploads/gif/outerspace-58.gif",
        // "https://cdnb.20m.es/yaestaellistoquetodolosabe/files/2014/05/Por-qu%C3%A9-al-planeta-Tierra-tambi%C3%A9n-se-le-llama-%E2%80%98mundo%E2%80%99.jpg",
      },
      difficulty: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
          max: 5,
        },
      },
      duration: {
        type: DataTypes.INTEGER,
      },
      season: {
        type: DataTypes.ENUM(
          "invierno",
          "verano",
          "otoño",
          "primavera",
          "todo el año"
        ),
      },
    },
    {
      timestamps: false,
    }
  );
};
