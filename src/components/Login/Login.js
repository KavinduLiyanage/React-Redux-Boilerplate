import React from 'react';
import { login } from "./Auth";
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';

//Login page of the System
export default class Login extends React.Component {
    render() {
        return (
            <div className="container" style={{maxWidth: "400px"}}>
                <div className=" h-100">
                    <h3>Login</h3>
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string()
                                .email('Email is invalid')
                                .required('Email is required'),
                            password: Yup.string()
                                .min(6, 'Password must be at least 6 characters')
                                .required('Password is required')
                        })}
                        onSubmit={fields => {
                            login(fields.email, fields.password);
                            window.location = "/";
                        }}
                    >
                        {({errors, touched}) => (
                            <Form style={{textAlign: "left"}}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field name="email" type="text" className={'form-control' + (
                                        errors.email && touched.email ? ' is-invalid' : '')}/>
                                    <ErrorMessage name="email" component="div" className="invalid-feedback"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field name="password" type="password" className={'form-control' + (
                                        errors.password && touched.password ? ' is-invalid' : '')}/>
                                    <ErrorMessage name="password" component="div" className="invalid-feedback"/>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block mr-2">Login</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        );
    }
}