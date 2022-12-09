
import { useDispatch, useSelector } from "react-redux"

import { filterForContinent, filtredData, pageChange } from "../store/actions"

import Styles from "../Styles.module.css"




export default function Filter (){



    const dispatch = useDispatch()

    function butonAction(e){
        dispatch(pageChange(e.target.name))
    }

    function OrderFiltred(e){
        dispatch(filtredData(e.target.value))
    }
    function handleContinents(e){
        dispatch(filterForContinent(e.target.value))
    }


    return (
        <div className={Styles.filterDiv}>
            {/* onChange={OrderFiltred} */}
            <select onChange={OrderFiltred}>
                <option  value="A_to_Z">A to Z</option>
                <option value="Z_to_A">Z to A</option>
                <option value="popAsc">popul.Asc</option>
                <option value="popDesc">popul.Desc</option>
            </select>


            <button onClick={butonAction} className={Styles.back} name={"lastPage"}></button>
            <span className={Styles.countPage}>{useSelector(state => state.page+1)}</span>
            <button onClick={butonAction} className={Styles.next} name={"nextPage"}></button>
            
            <select onChange={handleContinents}>
                <option value="All continents">All Countries</option>
                <option value="North America">North América</option>
                <option value="South America">South América</option>
                <option value="Africa">Africa</option>
                <option value="Europe">Europe</option>
                <option value="Asia">Asia</option>
                <option value="Oceania">Oseania</option>
                <option value="Antarctica">Antarctica</option>
            </select>
        </div>
    )
}