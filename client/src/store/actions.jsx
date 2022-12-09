import axios from "axios"

export const GET_ALL_DATA = "GET_ALL_DATA"
export const FILTRED_DATA = "FILTRED_DATA"
export const PAGE_CHANGE = "PAGE_CHANGE"
export const CONTINENT_FILTER = "CONTINENT_FILTER"
export const VERIFY_CHANGE = "VERIFY_CHANGE"
export const SEARCH_COUNTRY = "VERIFY_CHANGE"
export const GET_DETAIL= "GET_DETAIL"
export const RESET_COUNTRIES ="RESET_COUNTRIES"


//pedido a la base de datos
export function getAllCountries (){
    return function(dispatch){                                
        axios.get(`http://localhost:3001/country`) //fetch("url") .then(response => response.json()).then(data => dispatch({type:GET_ALL, payload:data}))
        // FETCH
        //.then(response => response.json()) con axios es inecesario
        //.then(data => console.log(data))
        //AXIOS
        //.then(response => console.log(response.data))
        .then(response => dispatch({type:GET_ALL_DATA , payload:response.data}))      //{... data:[{}{}{}{}]}                                        // reducer
    }
}

export function resetCountries(){
    return {
        type: RESET_COUNTRIES
    }
}

export function filtredData(ordervalue){
    return {
        type:FILTRED_DATA,
        payload: ordervalue
   
    }

}


export function pageChange(event){
    return {
        type: PAGE_CHANGE,
        payload: event
    }
}

export function filterForContinent(continent){
    return{
        type:CONTINENT_FILTER,
        payload: continent
    }
}



export function searchCountry (searchVal){
    return {
        type:SEARCH_COUNTRY,
        payload: searchVal
    }
}

export function getDetail(id){
    return {
        type: GET_DETAIL,
        payload:id
    }

}

