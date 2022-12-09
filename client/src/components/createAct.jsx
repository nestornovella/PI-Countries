import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getAllCountries, resetCountries } from "../store/actions"
import Styles from "../Styles.module.css"
import Spinner from "./loading"


export default function CreateAct() {

    const [activity, setActivity] = useState({
        name: "",
        season: "",
        dificulty: 0,
        countries: [],
        mssaje: ""
    })

    const allCountries = useSelector(state => state.countriesData)
    const countriesname = allCountries.map(c => c.name) || []

    useEffect(() => {
        if (allCountries.length < 1) {
            dispatch(getAllCountries())
        }
    })

   

    const dispatch = useDispatch()

    function handleInputChange(e) {
        setActivity({
            ...activity,
            [e.target.name]: e.target.value
        })

    }

    function handleOptions(e) {

        console.log(e.target.name, e.target.value)
        if (e.target.name === "seasons") {

            setActivity({
                ...activity,
                season: e.target.value

            })
        } else {
            !activity.countries.includes(e.target.value) && e.target.value !== "" &&
                setActivity({
                    ...activity,
                    countries: [...activity.countries, e.target.value]
                })
        }
    }


    function handleDelete(e) {
        setActivity({
            ...activity,
            countries: [...activity.countries.filter(c => c !== e.target.parentNode.childNodes[1].value)]
        })
        console.log(e.target.parentNode.childNodes[1].value)
    }

    function handleSubmit(e) {
        e.preventDefault()


        axios.post("http://localhost:3001/activity", activity)
            .then(response => console.log(response))
            .then(response => { dispatch(resetCountries()) })
            .then(setActivity({
                name: "",
                season: "",
                dificulty: 0,
                countries: [],
                mssaje: "Actividad creada con exito."
            }))
        setTimeout(() => {
            setActivity({
                name: "",
                season: "",
                dificulty: 0,
                countries: [],
                mssaje: ""
            })

        }, 3000)


    }


    return (
        <div className={Styles.activity}>
            <Link to={"/country"}><button className={Styles.backAct}>X</button></Link>
            <h1>Create Activity</h1>
            <form onSubmit={handleSubmit} >
                <label htmlFor="">{"Name:"}</label>
                <input onChange={handleInputChange} name="name" value={activity.name} type="text" />

                <label>{"Season:"}</label>
                <select onChange={handleOptions} name="seasons" >
                    <option value="">{"select a season -->"}</option>
                    <option value="summer">summer</option>
                    <option value="winter">winter</option>
                    <option value="spring">spring</option>
                    <option value="autumn">autumn</option>
                </select>
                <div className={Styles.dificulty}>
                    <label>{"Dificulty:"}</label>
                    <p>{activity.dificulty}</p>
                </div>
                <input className={Styles.rangeInp} onChange={handleInputChange} name="dificulty" value={activity.dificulty} type="range" min={0} max={5} />

                <label>{"Countries:"}</label>

                <select disabled={countriesname.length ? false : true} name="country" onChange={handleOptions}>
                    <option value={""}>{"Select a contry-->"}</option>
                    {countriesname.map((c, i) => (
                        <option key={i} value={c}>{c}</option>
                    ))}
                </select>

                {countriesname.length<1&&
                <h5>Loading...</h5>}
                <button className={Styles.submitAct} type="submit">send</button>

                {activity.mssaje && <h5>{activity.mssaje}</h5>}


            </form>

            <div className={Styles.activityCountry}>
                {activity.countries.length > 0 && activity.countries.map(c => (
                    <div className={Styles.activityCountry}>
                        <p className={Styles.pcountry}>{c}</p>
                        <input value={c} type="hidden" />
                        <button onClick={handleDelete}>🗑️</button>
                    </div>
                ))}
            </div>
        </div>
    )
}