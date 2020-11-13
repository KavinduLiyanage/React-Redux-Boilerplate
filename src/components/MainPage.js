import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import CountryList from "./CountryList";
import NavBar from "./NavBar";
import CountryDistance from "./CountryDistance";
import CountryClosest from "./CountryClosest";
function MainPage() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <NavBar/>
                <div className="container" style={{ maxWidth: "60%", marginTop: 30}}>
                    <Switch>
                        <Route exact path = '/' component = { Dashboard }/>
                        <Route exact path = '/countryList' component = { CountryList }/>
                        <Route exact path = '/calculateDistance' component = { CountryDistance }/>
                        <Route exact path = '/countryClosest' component = { CountryClosest }/>
                    </Switch>
                </div>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default MainPage;