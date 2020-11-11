import React, { Component } from 'react'
import { connect } from 'react-redux'

class SelectedCountry extends Component {

    render() {
        if(!this.props.selectedCountry){
            return(
                <h2>Not Selected</h2>
            )
        }
        return (
            <div>
                <li> Population : {this.props.selectedCountry.population}</li>
                <li> Timezones : {this.props.selectedCountry.timezones}</li>
                <li> NumericCode : {this.props.selectedCountry.numericCode}</li>
                <li> Region : {this.props.selectedCountry.region}</li>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        selectedCountry:state.selectedCountry
    }
}

export default connect(mapStateToProps)(SelectedCountry)
