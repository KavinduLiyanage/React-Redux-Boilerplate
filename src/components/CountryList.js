import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {requestApiData} from '../actions/countryActions';

class CountryList extends Component {

    componentDidMount() {
        this.props.requestApiData();
    };

    createListItems() {
        return this.props.data.map((country)=>{
            return(
            <li key={country.name} >{country.name} - {country.alpha3Code}</li>
            )
        })
    };

    render() {
        return this.props.data.length ?
            <div>
                <h3><span className="badge badge-dark">Countries List</span></h3>

                <div>
                    {this.createListItems()}
                </div>
            </div>
            : <h1>loading...</h1>;
    }
}

function mapStateToProps(state) {
    return{
        data: state.data
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            requestApiData
        },
        dispatch
    )
}

export default connect(mapStateToProps,matchDispatchToProps)(CountryList);