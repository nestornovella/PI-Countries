import { continents, filter, pageLength } from "../functions/functions"
import { CONTINENT_FILTER, FILTRED_DATA, GET_ALL_DATA, GET_DETAIL, PAGE_CHANGE, RESET_COUNTRIES, SEARCH_COUNTRY } from "./actions"


const initialState = {
    countriesData: [], 
    filtredData: [], //-
    countryDetail:"",
    paginedData: [],
    page: 0,
    pages: 0, //total de paginas
    search: ""
}


export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_DATA:
            return {
                ...state,
                countriesData: action.payload,
                filtredData: filter(action.payload),
                pages: pageLength(action.payload),
                page: 0
            }

        case FILTRED_DATA:

            let result = filter([...state.filtredData], action.payload)
            return {
                ...state,
                filtredData: result,
                pages: pageLength(result),
                page: 0
            }

        case PAGE_CHANGE:
            console.log(state.pages)
            console.log(state.page)
            return {
                ...state,
                page: action.payload === "lastPage" ? state.page > 0 && state.page - 1 : state.page < state.pages - 1 ? state.page + 1 : state.page
            }


        case CONTINENT_FILTER:

            let continentFiltredSearch = [];
            state.search
                ?
                continentFiltredSearch = continents([...state.countriesData].filter(c => c.name.includes(state.search)), action.payload)
                :
                continentFiltredSearch = continents([...state.countriesData], action.payload)

            return {
                ...state,
                filtredData: continentFiltredSearch,
                pages: pageLength(continentFiltredSearch),
                page: 0
            }



        case SEARCH_COUNTRY:
            let searchResult = state.countriesData.filter(c => c.name.includes(action.payload))

            return {
                ...state,
                filtredData: searchResult,
                pages: pageLength(searchResult),
                search: action.payload,
                page: 0
            }
        case GET_DETAIL:
            let detail = [...state.countriesData].filter(c => c.id === action.payload)
            
            return {
                ...state,
                countryDetail: detail[0]
            }
        
        case RESET_COUNTRIES:
            return{
                ...state,
                countriesData:[],
                filtredData:[]
            }



        default: return { ...state }
    }

}