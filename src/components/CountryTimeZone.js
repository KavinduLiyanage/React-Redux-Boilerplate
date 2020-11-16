import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {requestApiData} from "../actions/countryActions";
import {connect} from "react-redux";
import _sortBy from 'lodash.sortby';

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

    findCountries(timeZone1,timeZone2) {

        let minTimeZone = timeZone1;
        let maxTimeZone = timeZone2;

        if(minTimeZone>maxTimeZone) {
            minTimeZone = timeZone2;
            maxTimeZone = timeZone1;
        }

        let filteredData = [];

        this.props.data.map((data) => {
            (
                data.timezones.map((item) => {

                    let temp = item.replace(':', '.');
                    temp = parseFloat(temp.replace('UTC', ''));
                    if((minTimeZone < temp) && (maxTimeZone > temp)) {

                        let obj = {
                            name : data.name,
                            timeZone: item,
                            timeZoneFloat: temp
                        };
                        filteredData.push(obj);

                    }
                    return filteredData;
                })
            )
            return filteredData;
        });

        const unique = filteredData
            .map(e => e['name'])

            // store the keys of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)

            // eliminate the dead keys & store unique objects
            .filter(e => filteredData[e]).map(e => filteredData[e]);

        const sortUniqueCountries = _sortBy(unique, ['timeZoneFloat']);

        this.setState({
            filteredCountries: sortUniqueCountries
        });

    }

    render() {
        return (
            <div className="container">
                <h3><span className="badge badge-dark">Find Countries using Timezones</span></h3>
                <div className="container" style={{
                    width: "60%",
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
                            onClick={() => this.findCountries(parseFloat(this.state.timeZone1),parseFloat(this.state.timeZone2) )}>Find
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

export default connect(mapStateToProps,matchDispatchToProps)(CountryTimeZone);