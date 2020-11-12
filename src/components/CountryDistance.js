import React, {Component} from 'react';
import _find from 'lodash.find';
import getDistance from 'geolib/es/getDistance';

class CountryDistance extends Component {

    constructor(props) {
        super(props);

        this.state = {
            countries:[],
            country1:"",
            country2:"",
            country1Name:"",
            country2Name:"",
            distance:0
        };
    };

    country1Change = event => {
        this.setState({ country1: event.target.value });
    };

    country2Change = event => {
        this.setState({ country2: event.target.value });
    };

    findDistance(country1,country2) {
        const country1Result = _find(this.props.allCountries, ['alpha3Code', country1]);
        const country2Result = _find(this.props.allCountries, ['alpha3Code', country2]);

        let temp = getDistance(
            { latitude: country1Result.latlng[0], longitude: country1Result.latlng[1] },
            { latitude: country2Result.latlng[0], longitude: country2Result.latlng[1] }
        );

        this.setState({
            distance: temp,
            country1Name:country1Result.name,
            country2Name:country2Result.name
        });
    };

    render() {
        return (
            <div className="container">
                <h2>Calculate Distance Between Two Countries</h2>
                <div className="container">
                    <div className="form-group">
                        <label>Country 1</label>
                        <input type="text" className="form-control" placeholder="Enter Country"
                               value={this.state.country1}
                               onChange={this.country1Change}/>
                    </div>
                    <div className="form-group">
                        <label>Country 2</label>
                        <input type="text" className="form-control" placeholder="Enter Country"
                               value={this.state.country2}
                               onChange={this.country2Change}/>
                    </div>
                    <button className="btn btn-primary"
                            onClick={() => this.findDistance(this.state.country1, this.state.country2)}>Calculate
                    </button>
                </div>
                <br/>
                <div>
                    {this.state.distance ? (
                        <h2><span class="badge badge-success">Distance between {this.state.country1Name} and {this.state.country2Name} : {(this.state.distance/1000).toFixed(1)} KMs</span></h2>
                    ) : (
                        <br/>
                    )}
                </div>
            </div>
        );
    }
}

export default CountryDistance;