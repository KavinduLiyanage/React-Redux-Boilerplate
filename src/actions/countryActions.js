import { FETCH_BUTTON_CLICKED, SELECT_COUNTRY } from "./types";
import axios from 'axios';

export const fetchCountries=()=> dispatch=>{
    axios.get("https://restcountries.eu/rest/v2/all")
    .then(res=>{
      dispatch({
        type:FETCH_BUTTON_CLICKED,
        payload:res.data
      })
    })
}

export const selectCountry=(country)=>{
    return{
        type:SELECT_COUNTRY,
        payload:country

    }
};