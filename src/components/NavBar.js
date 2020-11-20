import React, {Component} from 'react';
import { Link } from "react-router-dom";
import {isLogin, logout} from "./Login/Auth";

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogin: isLogin()
        };
    }

    handleLogout = () => {
        logout();
        this.setState({
            isLogin: false,
        });
    };

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="/">Countries Info</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    {this.state.isLogin ? (
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <a className="nav-link" href="/">Dashboard <span
                                        className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item active">
                                    <a className="nav-link" href="/countryList">Country List</a>
                                </li>
                                <li className="nav-item active">
                                    <a className="nav-link" href="/calculateDistance">Calculate Distance</a>
                                </li>
                                <li className="nav-item active">
                                    <a className="nav-link" href="/countryClosest">Find Closest</a>
                                </li>
                                <li className="nav-item active">
                                    <a className="nav-link" href="/countrySearch">Search Country</a>
                                </li>
                                <li className="nav-item active">
                                    <a className="nav-link" href="/countryTimeZone">Timezone Search</a>
                                </li>
                            </ul>
                            <ul className="navbar-nav ml-md-auto">
                                <li className="nav-item active">
                                    <span className="badge badge-light">
                                        <Link to="" onClick={() => this.handleLogout()}>
                                            Logout
                                        </Link>
                                    </span>
                                </li>
                                <br/>
                            </ul>
                        </div>
                    ) : (
                        <span style={{ display: "none" }}> Empty </span>
                    )}
                </nav>
            </div>
        );
    }
}

export default NavBar;