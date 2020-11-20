import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {requestApiData} from "../actions/countryActions";
import {findClosest} from "../helpers/helper-Functions";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

class CountryClosest extends Component {

    constructor(props) {
        super(props);

        this.props.requestApiData();

        this.state = {
            countryInputName:"",
            countryClosestName:"",
            countryClosestDistance:0
        };

    };

    findOnClick(country1) {

        const result = findClosest(country1);

        this.setState({
            countryClosestName: result.countryClosestName,
            countryClosestDistance:result.countryClosestDistance,
            countryInputName:result.countryInputName
        });
    };

    render() {
        return (
            <div>
                <Formik
                    initialValues={{
                        country1: ''
                    }}
                    validationSchema={Yup.object().shape({
                        country1: Yup.string()
                            .max(3, 'Must be exactly 3 characters')
                            .min(3, 'Must be exactly 3 characters')
                            .required('Country is required')
                    })}
                    onSubmit={fields => {
                        try {
                            this.findOnClick(fields.country1.toUpperCase());
                        } catch (e) {
                            alert("Invalid Country Code");
                            this.setState({
                                countryClosestName: "",
                                countryClosestDistance:"",
                                countryInputName:""
                            });
                        }
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <h3><span className="badge badge-dark">Find Closest Country</span></h3>
                            <div className="container" style={{
                                maxWidth: "350px", minWidth: "300px",
                                textAlign: "left"
                            }}>
                                <div className="form-group">
                                    <label htmlFor="country1">Country</label>
                                    <Field name="country1" type="text" placeholder="Enter 3 Letter Country Code" className={'form-control' + (errors.country1 && touched.country1 ? ' is-invalid' : '')} />
                                    <ErrorMessage name="country1" component="div" className="invalid-feedback" />
                                </div>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-lg mr-2">Find</button>
                            </div>
                        </Form>
                    )}
                </Formik>
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