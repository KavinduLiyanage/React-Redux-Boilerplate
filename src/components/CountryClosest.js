import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {requestApiData} from "../actions/countryActions";
import {findClosest} from "../helpers/helper-Functions";

class CountryClosest extends Component {

    constructor(props) {
        super(props);

        this.props.requestApiData();

        this.state = {
            countryInput:"",
            countryInputName:"",
            countryClosestName:"",
            countryClosestDistance:0
        };

    };

    countryInputChange = event => {
        this.setState({ countryInput: event.target.value });
    };

    findOnClick(country1) {

        if (!this.state.countryInput) {
            return alert('Please enter country')
        }

        const result = findClosest(country1);

        this.setState({
            countryClosestName: result.countryClosestName,
            countryClosestDistance:result.countryClosestDistance,
            countryInputName:result.countryInputName
        });
    };

    render() {
        return (
            <div className="container">
                <h3><span className="badge badge-dark">Find Closest Country</span></h3>
                <div className="container" style={{
                    width: "60%",
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
                            onClick={() => this.findOnClick(this.state.countryInput)}>Find
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

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            requestApiData,
        },
        dispatch
    )
}

export default connect(null,matchDispatchToProps)(CountryClosest);