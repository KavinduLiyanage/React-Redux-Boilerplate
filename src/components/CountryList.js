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
            <li className="list-group-item" key={country.name} >{country.name} - {country.alpha3Code}</li>
            )
        })
    };

    render() {
        return this.props.data.length ?
            <div className="container" style={{
                width: "70%"
            }}>
                <h3><span className="badge badge-dark">Countries List</span></h3>

                <ul className="list-group">
                    {this.createListItems()}
                </ul>
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