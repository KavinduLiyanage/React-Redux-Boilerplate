import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {requestApiData} from "../actions/countryActions";
import {connect} from "react-redux";
import {findTimezones} from "../helpers/helper-Functions";
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';

class CountryTimeZone extends Component {
    constructor(props) {
        super(props);

        this.props.requestApiData();

        this.state = {
            filteredCountries:0
        };
    };

    findTimezoneOnClick(timeZone1,timeZone2) {

        const result = findTimezones(timeZone1,timeZone2);

        this.setState({
            filteredCountries: result
        });
    }

    render() {
        return (
            <div>
                <Formik
                    initialValues={{
                        timeZone1: '',
                        timeZone2: ''
                    }}
                    validationSchema={Yup.object().shape({
                        timeZone1: Yup.number()
                            .moreThan(-14, 'Timezone must be -13 or more')
                            .lessThan(14, 'Timezone must be 13 or less')
                            .required('Start Timezone is required'),
                        timeZone2: Yup.number()
                            .moreThan(-14, 'Timezone must be -13 or more')
                            .lessThan(14, 'Timezone must be 13 or less')
                            .notOneOf([Yup.ref('timeZone1'), null], 'Timezones must different')
                            .required('End Timezone is required')
                    })}
                    onSubmit={fields => {
                        try {
                            this.findTimezoneOnClick(parseFloat(fields.timeZone1),parseFloat(fields.timeZone2));
                        } catch (e) {
                            alert("Invalid Timezone");
                            this.setState({
                                distance: "",
                                timeZone1Name:"",
                                timeZone2Name:""
                            });
                        }
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <h3><span className="badge badge-dark">Find Countries using Timezones</span></h3>
                            <div className="container" style={{
                                maxWidth: "350px", minWidth: "300px",
                                textAlign: "left"
                            }}>
                                <div className="form-group">
                                    <label htmlFor="timeZone1">Start Timezone (UTC)</label>
                                    <Field name="timeZone1" type="number" className={'form-control' + (errors.timeZone1 && touched.timeZone1 ? ' is-invalid' : '')} />
                                    <ErrorMessage name="timeZone1" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="timeZone2">End Timezone (UTC)</label>
                                    <Field name="timeZone2" type="number" className={'form-control' + (errors.timeZone2 && touched.timeZone2 ? ' is-invalid' : '')} />
                                    <ErrorMessage name="timeZone2" component="div" className="invalid-feedback" />
                                </div>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-lg mr-2">Find</button>
                                <button type="reset" className="btn btn-secondary btn-lg">Clear</button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className="container" style={{maxWidth: "500px", minWidth: "350px"}}>
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