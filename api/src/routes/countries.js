const { Router } = require('express');
const {Op, Country, Activity } = require("../db.js")
const axios = require("axios");
const { idCreator } = require('../../functions/functions');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const key = 4524
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", async (req, res, next) => {
    //const {name, flags, continents, capital, subregion, area, population} = req.body
    const dbexterna = await axios.get("https://restcountries.com/v3.1/all") //[{},{},{}]
    const { name } = req.query
    const dbInterna = await Country.findAll() //trae todo de mi base de datos []
        !dbInterna.length && (
            //bullCreate permite pasar un arreglo de objetos para que se almacenen en db
            await Country.bulkCreate(dbexterna.data.map(c => {
                return { //{id,name,flags,continents,capital,subregion,area,population}
                    id: idCreator(),
                    name: c.name.common.toLowerCase(),
                    flags: c.flags.png,
                    continents: c.continents,            //[{name : argentina}, {name:argelia}, {name:colombia}]
                    capital: c.capital,
                    subregion: c.subregion,
                    area: parseInt(c.area),
                    population: parseInt(c.population)
                }
            })
            ) //base de datos [{}, {}]
        )

    if (!name) {
        try {
            const response = await Country.findAll({ 
                include: {model: Activity} //asociar activida con pais
            })
            if(!response) throw "error con el servidor , por favor intentelo mas tarde."
            else{res.json(response)}
        } catch (error) {
            next(error)
        }
    } else {// si me pasa por query
        try {
            const result = await Country.findAll({
                where:{
                    name:{
                        [Op.like]: `%${name}%` // % name termine name   name%  todo lo que comienze con name  %name% todo lo que contenga
                    }
                },
                include:{model: Activity}
                
            })
            if(!result.length) throw "No se encontro el país." 
            else res.json(result)

        } catch (error) {
            next(error)
        }
    }

})

router.get("/:id", async (req, res, next)=>{
    try {
        console.log()
       const countryFinded = await Country.findByPk(req.params.id)
       if(countryFinded) res.json(countryFinded)
       else{throw "no se encontro el país con ese Id."} 
    } catch (error) {
        next(error)   
    }
})

//id name dificulty season




module.exports = router;
