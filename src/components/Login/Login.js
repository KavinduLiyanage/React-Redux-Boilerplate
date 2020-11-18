import React from 'react';
import { login } from "./Auth";

//Login page of the System
export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: "",
            password: "",
        };
    }

    updateInput(key, value) {
        this.setState({
            [key]: value,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        login(this.state.email, this.state.password);
        window.location = "/";

    }

    render() {
        return (
            <div className="container" style={{ maxWidth: "400px"}}>
                <div className=" h-100" >
                    <h3>Login</h3>
                            <form style={{textAlign: "left"}} onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="email" className="form-control" placeholder="Email"
                                           value={this.state.email}
                                           onChange={(e) => this.updateInput("email", e.target.value)}
                                           required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control"  placeholder="password"
                                           value={this.state.password}
                                           onChange={(e) =>
                                               this.updateInput("password", e.target.value)
                                           }
                                           required/>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Login</button>
                            </form>
                        <br/>
                </div>
            </div>
        );
    }
}