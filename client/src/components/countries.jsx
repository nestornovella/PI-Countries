import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {  getAllCountries } from "../store/actions"
import Card from "./countryCard"
import Styles from "../Styles.module.css"
import Spinner from "./loading"




export default function Countries() {


    const dispatch = useDispatch()
    
    let data = useSelector(state=>state.filtredData)
    let page = useSelector(state => state.page)
    let searchvalue = useSelector(state=> state.search)

    useEffect(()=>{
      
        !data.length && 
        dispatch(getAllCountries())
        console.log("se renderiza")
    },[])
    return (
        <div className={Styles.countries}>
            {data.length ? data.map((e ,i)=>{
            return (
            i >= page*10 &&
            i <= (page*10) + 9  && 

                <Card key={e.id} id={e.id} name={e.name} flags={e.flags}  population ={e.population} continents={e.continents} activities={e.Activities}></Card>
            )
        }): searchvalue ? <img src="../img/notFound.png" alt="" /> : <Spinner/>}
        </div>
    )

}

