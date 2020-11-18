import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {requestApiData} from "../actions/countryActions";
import {connect} from "react-redux";
import {findTimezones} from "../helpers/helper-Functions";

class CountryTimeZone extends Component {
    constructor(props) {
        super(props);

        this.props.requestApiData();

        this.state = {
            timeZone1: 0,
            timeZone2: 0,
            filteredCountries:0
        };
    };

    timeZone1Change = event => {
        this.setState({ timeZone1: event.target.value });
    };

    timeZone2Change = event => {
        this.setState({ timeZone2: event.target.value });
    };

    findTimezoneOnClick(timeZone1,timeZone2) {

        if ((timeZone1-timeZone2)===0) {
            return alert('Please enter valid timezones')
        }

        const result = findTimezones(timeZone1,timeZone2);

        this.setState({
            filteredCountries: result
        });
    }

    render() {
        return (
            <div className="container" style={{
                width: "60%",
            }}>
                <h3><span className="badge badge-dark">Find Countries using Timezones</span></h3>
                <div className="container" style={{
                    textAlign: "left"
                }}>
                    <div className="form-group">
                        <label>Start Timezone (UTC)</label>
                        <input type="number" className="form-control"
                               value={this.state.timeZone1}
                               onChange={this.timeZone1Change}/>
                    </div>
                    <div className="form-group">
                        <label>End Timezone (UTC)</label>
                        <input type="number" className="form-control"
                               value={this.state.timeZone2}
                               onChange={this.timeZone2Change}/>
                    </div>
                </div>
                <div>
                    <button className="btn btn-primary btn-lg"
                            onClick={() => this.findTimezoneOnClick(parseFloat(this.state.timeZone1),parseFloat(this.state.timeZone2) )}>Find
                    </button>
                </div>
                <br/>
                <div className="col text-center">
                    {this.state.filteredCountries ? (
                        <ul className="list-group">
                            {this.state.filteredCountries.map(country => {
                                return (
                                    <li key={country.name}
                                        className="list-group-item list-group-item-success">{country.name} - {country.timeZone}</li>
                                );
                            })}
                        </ul>
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

export default connect(null,matchDispatchToProps)(CountryTimeZone);