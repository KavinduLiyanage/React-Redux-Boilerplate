import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import CountryList from "./CountryList";
import NavBar from "./NavBar";
import CountryDistance from "./CountryDistance";
import CountryClosest from "./CountryClosest";
import CountrySearch from "./CountrySearch";
import CountryTimeZone from "./CountryTimeZone";
import PrivateRoute from "./Login/PrivateRoute";
import Login from "./Login/Login";
function MainPage() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <NavBar/>
                <div className="container" style={{ maxWidth: "60%", marginTop: 30}}>
                    <Switch>
                        <Route exact path = '/login' component = { Login }/>
                        <PrivateRoute exact path = '/' component = { Dashboard }/>
                        <PrivateRoute exact path = '/countryList' component = { CountryList }/>
                        <PrivateRoute exact path = '/calculateDistance' component = { CountryDistance }/>
                        <PrivateRoute exact path = '/countryClosest' component = { CountryClosest }/>
                        <PrivateRoute exact path = '/countrySearch' component = { CountrySearch }/>
                        <PrivateRoute exact path = '/countryTimeZone' component = { CountryTimeZone }/>
                    </Switch>
                </div>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default MainPage;