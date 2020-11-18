import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {requestApiData} from "../actions/countryActions";
import {findDistance} from "../helpers/helper-Functions";

class CountryDistance extends Component {
    constructor(props) {
        super(props);

        this.props.requestApiData();
        this.state = {
            country1:"",
            country2:"",
            country1Name:"",
            country2Name:"",
            distance:0
        };
    };

    country1Change = event => {
        this.setState({ country1: event.target.value });
    };

    country2Change = event => {
        this.setState({ country2: event.target.value });
    };

    calculateOnClick(country1,country2) {

        if (!country1 || !country2 ) {
            return alert('Please enter countries')
        }

        const result = findDistance(country1, country2);

        this.setState({
            distance: result.distance,
            country1Name:result.country1Name,
            country2Name:result.country2Name
        });
    }

    render() {
        return (
            <div className="container">
                <h3><span className="badge badge-dark">Calculate Distance Between Two Countries</span></h3>
                <div className="container" style={{
                    width: "60%",
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
                            onClick={() => this.calculateOnClick(this.state.country1, this.state.country2)}>Calculate
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

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            requestApiData,
        },
        dispatch
    )
}

export default connect(null,matchDispatchToProps)(CountryDistance);