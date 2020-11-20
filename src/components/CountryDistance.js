import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {requestApiData} from "../actions/countryActions";
import {findDistance} from "../helpers/helper-Functions";
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';

class CountryDistance extends Component {
    constructor(props) {
        super(props);

        this.props.requestApiData();
        this.state = {
            country1Name:"",
            country2Name:"",
            distance:0
        };
    };

    calculateOnClick(country1,country2) {

        if (country1 === country2 ) {
            return alert('Please enter different countries')
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
            <div>
                <Formik
                    initialValues={{
                        country1: '',
                        country2: ''
                    }}
                    validationSchema={Yup.object().shape({
                        country1: Yup.string()
                            .max(3, 'Must be exactly 3 characters')
                            .min(3, 'Must be exactly 3 characters')
                            .required('Country 1 is required'),
                        country2: Yup.string()
                            .max(3, 'Must be exactly 3 characters')
                            .min(3, 'Must be exactly 3 characters')
                            .notOneOf([Yup.ref('country1'), null], 'Countries must different')
                            .required('Country 2 is required')
                    })}
                    onSubmit={fields => {
                        try {
                            this.calculateOnClick(fields.country1.toUpperCase(), fields.country2.toUpperCase());
                        } catch (e) {
                            alert("Invalid Country Code");
                            this.setState({
                                distance: "",
                                country1Name:"",
                                country2Name:""
                            });
                        }
                    }}
                    >
                    {({ errors, touched }) => (
                        <Form>
                            <h3><span className="badge badge-dark">Calculate Distance Between Two Countries</span></h3>
                            <div className="container" style={{
                                maxWidth: "350px", minWidth: "300px",
                                textAlign: "left"
                            }}>
                            <div className="form-group">
                                <label htmlFor="country1">Country 1</label>
                                <Field name="country1" type="text" placeholder="Enter 3 Letter Country Code" className={'form-control' + (errors.country1 && touched.country1 ? ' is-invalid' : '')} />
                                <ErrorMessage name="country1" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="country2">Country 2</label>
                                <Field name="country2" type="text" placeholder="Enter 3 Letter Country Code" className={'form-control' + (errors.country2 && touched.country2 ? ' is-invalid' : '')} />
                                <ErrorMessage name="country2" component="div" className="invalid-feedback" />
                            </div>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-lg mr-2">Calculate</button>
                                <button type="reset" className="btn btn-secondary btn-lg">Clear</button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className="container">
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