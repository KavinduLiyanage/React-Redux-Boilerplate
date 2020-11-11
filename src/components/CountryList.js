import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchCountries, selectCountry} from '../actions/countryActions';
import _find from 'lodash.find';
import getDistance from 'geolib/es/getDistance';

class CountryList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            countries:[],
            country1:"LKA",
            country2:"IND",
            distance:0
        };

    };
    country1Change = event => {
        this.setState({ country1: event.target.value });
    };

    country2Change = event => {
        this.setState({ country2: event.target.value });
    };

    componentDidMount() {
        this.props.fetchCountries();
        this.setState({
            countries: this.props.allCountries,
        });
    };

    createListItems() {
        return this.props.allCountries.map((country)=>{
            return(
            <li key={country.name} onClick={()=>this.props.selectCountry(country)}>{country.name} - {country.alpha3Code}</li>
            )
        })
    };

    findDistance(country1,country2) {
            const country3 = _find(this.props.allCountries, ['alpha3Code', country1]);
            const country4 = _find(this.props.allCountries, ['alpha3Code', country2]);
            const country1lat = country3.latlng[0];
            const country1lng = country3.latlng[1];
            const country2lat = country4.latlng[0];
            const country2lng = country4.latlng[1];
            //console.log(country3);
            //console.log(lat);
            //console.log(lng);

            let temp = getDistance(
                { latitude: country1lat, longitude: country1lng },
                { latitude: country2lat, longitude: country2lng }
            );

            console.log("Distance : "+temp/1000+"km");

    };

    findDistance2() {
        console.log("findDistance2");
    };

    render() {
        if(!this.props.allCountries){
            return(
                <button >Click Me</button>
            )
        }
        console.log(this.state.country1);
        console.log(this.state.country2);

        return (
            <div>
                <div>
                    <label>Country 1</label>
                    <input type="text" placeholder="Enter Country" value={this.state.country1}
                           onChange={this.country1Change}
                    />
                    <br/>
                    <label>Country 2</label>
                    <input type="text" placeholder="Enter Country" value={this.state.country2}
                           onChange={this.country2Change}
                    />
                    <br/>
                    <button onClick={this.findDistance(this.state.country1,this.state.country2)}><b>Calculate</b></button>
                </div>
                {this.createListItems()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        allCountries:state.allCountries
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            selectCountry: selectCountry,
            fetchCountries: fetchCountries
        },
        dispatch
    )
}


export default connect(mapStateToProps,matchDispatchToProps)(CountryList)