
const { Op, Country, Activity } = require("../db.js")
const { Router } = require("express")
const { idCreator } = require("../../functions/functions")


const router = Router()

//id name dificulty season
router.post("/", async (req, res, next) => {
    const { name, dificulty, season, countries } = req.body
    try {     //1 posicion, true || false
        const [actCreated, boolCreate] = await Activity.findOrCreate({
            // distractorin const obj{name:nestor, age:32}   const {name, age } = obj ||      const arr ["nestor", true]
            //                                                                           const [primero, bulean] = arr
            where: {
                name: name //si existe una actividad con el nombre especificado
            },
            defaults: { id: idCreator(true), name, dificulty: parseInt(dificulty) , season } //create

        })
        console.log(actCreated.dataValues.id)
        if (!actCreated) throw "No se pudo crear la actividad"
        else {
            countries.map(async (e) => {
                const countFind = await Country.findOne({
                    where: { name: e }
                })
                countFind.addActivity(actCreated.dataValues.id)
            })
            boolCreate ? res.send("Actividad creada y asociada.") : res.send("Actividad asociada")
        }
    } catch (error) { 
        next(error)}
})


router.get("/all", async(req, res, next)=>{
    const { atr } = req.query
    try {
        if(atr){
            const activities =await Activity.findAll({
                attributes:[atr] // ["name", "age"]
            })
            res.json(activities)
        }
        else{
            const activities = await Activity.findAll()
            res.json(activities)
        }

    } catch (error) {
        next("no hay actividades")
    }
})
module.exports = router