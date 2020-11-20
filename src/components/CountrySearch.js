import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {requestApiData} from "../actions/countryActions";
import {connect} from "react-redux";
import {searchCountries} from "../helpers/helper-Functions";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

class CountrySearch extends Component {
    constructor(props) {
        super(props);

        this.props.requestApiData();

        this.state = {
            filteredCountries:[]
        };
    };

    searchOnClick(search) {

        const result = searchCountries(search);

        this.setState({ filteredCountries: result });
    }

    render() {
        return (
            <div>
                <Formik
                    initialValues={{
                        country1: ''
                    }}
                    validationSchema={Yup.object().shape({
                        country1: Yup.string()
                            .required('Country is required')
                    })}
                    onSubmit={fields => {
                        try {
                            this.searchOnClick(fields.country1);
                        } catch (e) {
                            alert("Invalid Country Code");
                        }
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <h3><span className="badge badge-dark">Search Country</span></h3>
                            <div className="container" style={{
                                maxWidth: "350px", minWidth: "300px",
                                textAlign: "left"
                            }}>
                                <div className="form-group">
                                    <label htmlFor="country1">Country</label>
                                    <Field name="country1" type="text" placeholder="Enter name" className={'form-control' + (errors.country1 && touched.country1 ? ' is-invalid' : '')} />
                                    <ErrorMessage name="country1" component="div" className="invalid-feedback" />
                                </div>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-lg mr-2">Search</button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className="container" style={{maxWidth: "400px", minWidth: "350px"}}>
                    <div className="col text-center">
                        {this.state.filteredCountries.length ? (
                            <div>
                                {this.state.filteredCountries.length > 1 ? (
                                    <div>
                                        <h2>
                                            <span
                                                className="badge badge-success">Found {this.state.filteredCountries.length} countries
                                        </span>
                                        </h2>
                                    </div>
                                ) : (
                                    <div>
                                        <h2>
                                            <span
                                                className="badge badge-success">Found {this.state.filteredCountries.length} country
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