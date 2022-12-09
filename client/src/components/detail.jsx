import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getAllCountries, getDetail } from "../store/actions"
import Styles from "../Styles.module.css"
import Spinner from "./loading"


export default function Detail() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const allCountries = useSelector(state=> state.filtredData)

    useEffect(() => {
        if(allCountries.length<1){
            dispatch(getAllCountries())
        }else{
            
            dispatch(getDetail(id))
        }
  

    }, [allCountries])
    let country = useSelector(state => state.countryDetail)
    
    return (
        country.hasOwnProperty("name") ?
        <div className={Styles.detail}>
            <img src={country.flags} alt={`country ${country.name}`} />
            <Link to={"/country"}><button>X</button></Link>
            <h2>{`${country.name[0].toUpperCase()}${country.name.slice(1)}`}</h2>
            <h5>{`Id: ${country.id}`}</h5>
            <h5>{`Population: ${country.population}`}</h5>
            <h5>{`Continent: ${country.continents.slice(1, -1)}`} </h5>
            {country.Activities.length < 1 ? <h5>No hay actividades en este pais</h5>: country.Activities.map(act => (
                <div key={act.id} className={Styles.activityCard}>
                    <h4>{act.name.toUpperCase()}</h4>
                    <h5>{`Id: ${act.id}`}</h5>
                    <h5>{`Dificulty: ${act.dificulty}`}</h5>
                    <h5>{`Season: ${act.season}`}</h5>
                </div>
            ))  }

        </div>: <Spinner/>
    )
}