import { combineReducers } from 'redux';
import AllCountriesReducer from './reducer-AllCountry';
import SelectedCountryReducer from './reducer-SelectedCountry';

const rootReducer=combineReducers({
    allCountries:AllCountriesReducer,
    selectedCountry:SelectedCountryReducer
})

export default rootReducer;