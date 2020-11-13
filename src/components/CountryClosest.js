import React, {Component} from 'react';
import _find from 'lodash.find';
import getDistance from 'geolib/es/getDistance';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {requestApiData} from "../actions/countryActions";

class CountryClosest extends Component {

    constructor(props) {
        super(props);

        this.state = {
            countries:[],
            countryInput:"",
            countryInputName:"",
            countryClosestName:"",
            countryClosestDistance:0,
            distances:[],
        };

        this.props.requestApiData();

    };

    countryInputChange = event => {
        this.setState({ countryInput: event.target.value });
    };

    findClosest(country1) {

        if (!this.state.countryInput) {
            return alert('Please enter country')
        }

        let min = 1000000000000000;
        let minCountry = "";
        let countryInputName = "";

        this.props.data.map((country) => {

            const country1Result = _find(this.props.data, ['alpha3Code', country1]);
            countryInputName = country1Result.name;

            const country1lat = country1Result.latlng[0];
            const country1lng = country1Result.latlng[1];
            const country2lat = country.latlng[0];
            const country2lng = country.latlng[1];

            if(country2lat) {
                let temp = getDistance(
                    { latitude: country1lat, longitude: country1lng },
                    { latitude: country2lat, longitude: country2lng }
                );

                if(temp>0) {
                    if(temp<min) {
                        min = temp;
                        minCountry = country.name;
                    }
                }
            }
        });

        this.setState({
            countryClosestName: minCountry,
            countryClosestDistance:(min/1000).toFixed(1),
            countryInputName:countryInputName
        });
    };

    render() {

        return (
            <div className="container">
                <h3><span className="badge badge-dark">Find Closest Country</span></h3>
                <div className="container" style={{
                    width: "50%",
                    textAlign: "left"
                }}>
                    <div className="form-group">
                        <label>Enter Country </label>
                        <input type="text" className="form-control" placeholder="Enter 3 Letter Country Code"
                               value={this.state.countryInput}
                               onChange={this.countryInputChange}/>
                    </div>
                </div>
                <div>
                    <button className="btn btn-primary btn-lg"
                            onClick={() => this.findClosest(this.state.countryInput)}>Find
                    </button>
                </div>
                <br/>
                <div className="col text-center">
                    {this.state.countryClosestDistance ? (
                        <h2><span
                            className="badge badge-success">Closest Country is {this.state.countryClosestName} : {
                            this.state.countryClosestDistance} KMs away from {
                            this.state.countryInputName}</span></h2>
                    ) : (
                        <br/>
                    )}
                </div>
            </div>
        );
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
            requestApiData,
        },
        dispatch
    )
}

export default connect(mapStateToProps,matchDispatchToProps)(CountryClosest);