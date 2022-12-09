const {DataTypes} = require("sequelize")


// modelo  ID
//   - Nombre
//   - Dificultad (Entre 1 y 5)
//   - Duración
//   - Temporada (Verano, Otoño, Invierno o Primavera)

module.exports = (secualize) => {
    secualize.define("Activity" ,{
        id:{
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        dificulty:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        season:{
            type: DataTypes.ENUM("spring","summer","autumn","winter"),
            allowNull: false
        }
    
    },{timestamps:false})
} 
