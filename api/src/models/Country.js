const { DataTypes } = require('sequelize');
const { idCreator } = require('../../functions/functions.js');



// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Country', {
    id:{
      type: DataTypes.STRING,
      primaryKey: true  
    },
    name: {
      type: DataTypes.STRING, //char 
  
    },
    flags: {
      type:DataTypes.STRING
   
    },
    continents: {
      type: DataTypes.STRING, 
    },
    capital: {
      type:DataTypes.ARRAY(DataTypes.STRING)
    },
    subregion:{
      type:DataTypes.STRING,

    },
    area:{
      type: DataTypes.INTEGER,
 
    },
    population:{
      type: DataTypes.INTEGER,

    }
  },{timestamps:false});
};
