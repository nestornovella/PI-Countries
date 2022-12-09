import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { searchCountry } from "../store/actions"


import Styles from "../Styles.module.css"

export default function NavBar(){
    const countries = useSelector(state=> state.filtredData)
    
    const [search , setSearch] = useState("")
    const dispatch = useDispatch()

  

    function handleChange(e){
        setSearch(e.target.value)
        console.log(search)
        dispatch(searchCountry(search))
        
    }

    return(
        <div className={Styles.searchBar}>
            <label ></label>
            <input disabled={countries.length || search ? false : true} onChange={handleChange}  type="text" value={search} />
           <Link to={"/country/activity"}> <button>Create Activity</button> </Link>
        </div>
    )
}