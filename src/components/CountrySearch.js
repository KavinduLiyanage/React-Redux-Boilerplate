import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {requestApiData} from "../actions/countryActions";
import {connect} from "react-redux";
import {searchCountries} from "../helpers/helper-Functions";

class CountrySearch extends Component {
    constructor(props) {
        super(props);

        this.props.requestApiData();

        this.state = {
            search: "",
            filteredCountries:[],
        };
    };

    onchange = e => {
        this.setState({ search: e.target.value });
    };

    searchOnClick(search) {

        if (!search) {
            return alert('Please enter search keyword')
        }

        const result = searchCountries(search);

        this.setState({ filteredCountries: result });
    }

    render() {
        return (
            <div className="container" style={{
                width: "60%"
            }}>
                <div>
                    <h3><span className="badge badge-dark">Search Country</span></h3>
                    <div className="container" style={{

                        textAlign: "left"
                    }}>
                        <div className="form-group">
                            <label>Enter Country </label>
                            <input type="text" className="form-control" placeholder="Enter here"
                                   value={this.state.countryInput}
                                   onChange={this.onchange}/>
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-primary btn-lg"
                                onClick={() => this.searchOnClick(this.state.search)}>Search
                        </button>
                    </div>
                    <br/>
                </div>
                <div>
                    <div className="col text-center">
                        {this.state.filteredCountries.length ? (
                            <div>
                                {this.state.filteredCountries.length > 1 ? (
                                    <div>
                                        <h2>
                                            <span className="badge badge-success">Found {this.state.filteredCountries.length} countries
                                        </span>
                                        </h2>
                                    </div>
                                ) : (
                                    <div>
                                        <h2>
                                            <span className="badge badge-success">Found {this.state.filteredCountries.length} country
                                        </span>
                                        </h2>
                                    </div>
                                )}
                                <ul className="list-group">
                                    {this.state.filteredCountries.map(country => {
                                        return (
                                            <li key={country.name}
                                                className="list-group-item list-group-item-success">{country.name}</li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ) : (
                            <br/>
                        )}
                    </div>
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

export default connect(null,matchDispatchToProps)(CountrySearch);