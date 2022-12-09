import { Link } from "react-router-dom"
import Styles from "../Styles.module.css"


export default function Card ({id, name, flags, population, continents, activities}){
   
    return(
        <div className={Styles.card}>
            <Link to={`/country/detail/${id}`}><img src={flags} alt={`country ${name}`} /></Link>
            <h2>{`${name[0].toUpperCase()}${name.slice(1)}`}</h2>
            <h5>{`Id: ${id}`}</h5>
            <h5>{`Population: ${population}`}</h5>
            <h5>{`Continent: ${continents.slice(1, -1)}`} </h5>
            {activities.length>0 ? <h5 className={Styles.hayAct}>hay actividades...</h5>: <h5 className={Styles.noHayAct}>no hay actividades...</h5> }
        </div>
    )
}