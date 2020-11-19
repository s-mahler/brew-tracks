import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './BrewSpecs.css'

class BrewSpecs extends Component {

    handleSubmit = () => {
        this.props.history.push('/timer')
    };

    render() {
        return (
            <div className="formPanel specs">
                <h1>Brew Specifications</h1>

                <label>Method:</label>
                <input></input>

                <label>Roast:</label>
                <input></input>

                <label>Grind:</label>
                <input></input>

                <label>Origin:</label>
                <input></input>

                <label>Amount of coffee:</label>
                <input></input>

                <label>Amount of water:</label>
                <input></input>

                <button onClick={this.handleSubmit}>Time it</button>
            </div>
        )
    }
}

export default connect(mapStoreToProps)(BrewSpecs);