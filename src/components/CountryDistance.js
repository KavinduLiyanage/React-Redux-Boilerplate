import React, {Component} from 'react';
import _find from 'lodash.find';
import getDistance from 'geolib/es/getDistance';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {requestApiData} from "../actions/countryActions";

class CountryDistance extends Component {

    constructor(props) {
        super(props);

        this.state = {
            countries:[],
            country1:"",
            country2:"",
            country1Name:"",
            country2Name:"",
            distance:0
        };
    };

    componentDidMount() {
        this.props.requestApiData();
    };

    country1Change = event => {
        this.setState({ country1: event.target.value });
    };

    country2Change = event => {
        this.setState({ country2: event.target.value });
    };

    findDistance(country1,country2) {

        if (!this.state.country1 || !this.state.country2 ) {
            return alert('Please enter countries')
        }

        const country1Result = _find(this.props.data, ['alpha3Code', country1]);
        const country2Result = _find(this.props.data, ['alpha3Code', country2]);

        let temp = getDistance(
            { latitude: country1Result.latlng[0], longitude: country1Result.latlng[1] },
            { latitude: country2Result.latlng[0], longitude: country2Result.latlng[1] }
        );

        this.setState({
            distance: (temp/1000).toFixed(1),
            country1Name:country1Result.name,
            country2Name:country2Result.name
        });
    };

    render() {
        return (
            <div className="container">
                <h3><span className="badge badge-dark">Calculate Distance Between Two Countries</span></h3>
                <div className="container" style={{
                    width: "50%",
                    textAlign: "left"
                }}>
                    <div className="form-group">
                        <label>Country 1</label>
                        <input type="text" className="form-control" placeholder="Enter 3 Letter Country Code"
                               value={this.state.country1}
                               onChange={this.country1Change}/>
                    </div>
                    <div className="form-group">
                        <label>Country 2</label>
                        <input type="text" className="form-control" placeholder="Enter 3 Letter Country Code"
                               value={this.state.country2}
                               onChange={this.country2Change}/>
                    </div>
                </div>
                <div>
                    <button className="btn btn-primary btn-lg"
                            onClick={() => this.findDistance(this.state.country1, this.state.country2)}>Calculate
                    </button>
                </div>
                <br/>
                <div className="col text-center">
                    {this.state.distance ? (
                        <h2><span
                            className="badge badge-success">Distance between {this.state.country1Name} and {this.state.country2Name} : {
                            this.state.distance} KMs</span></h2>
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

export default connect(mapStateToProps,matchDispatchToProps)(CountryDistance);