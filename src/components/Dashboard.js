import React, {Component} from 'react';

class Dashboard extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <a className="btn btn-primary btn-lg" href="/calculateDistance" role="button">Calculate Distance</a>
                    </div>
                    <div className="col">
                        <a className="btn btn-primary btn-lg" href="/countryClosest" role="button">Find Closest</a>
                    </div>
                    <div className="w-100">
                        <br/>
                    </div>
                    <div className="col">
                        <a className="btn btn-primary btn-lg" href="/countryTimeZone" role="button">Timezone Search</a>
                    </div>
                    <div className="col">
                        <a className="btn btn-primary btn-lg" href="/countrySearch" role="button">Search Country</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;