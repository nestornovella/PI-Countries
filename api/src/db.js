require('dotenv').config();
const { Sequelize ,Op} = require('sequelize');
const {DB_USER, DB_PASSWORD, DB_HOST} = process.env;
const modelCountry = require("./models/Country.js") //modelCountry
const modelActivity = require("./models/Activity.js");


const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`, { //instancia
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});


modelCountry(sequelize)
modelActivity(sequelize)
// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
console.log(sequelize.models)
const { Activity, Country } = sequelize.models;

Country.belongsToMany(Activity, {through:"country-activity"}) //relacionar m t n
Activity.belongsToMany(Country, {through:"country-activity"})
// Aca vendrian las relaciones
// Product.hasMany(Reviews);
console.log("estos son los modelos -->",sequelize.models)
module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,
  Op     // para importart la conexión { conn } = require('./db.js');
};
