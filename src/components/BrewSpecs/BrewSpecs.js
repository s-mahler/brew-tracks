import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class BrewSpecs extends Component {

    state = {
        newSpecs:{
            method: '',
            roast: '',
            grind: '',
            origin: '',
            amount_coffee: '',
            amount_water: ''
        }
    }

    handleSubmit = () => {
        this.props.dispatch({type: 'ADD_SPECS', payload: this.state.newSpecs});
        this.props.history.push('/timer')
    };

    handleChange = (event, eventType) => {
        this.setState({
            newSpecs: {
                ...this.state.newSpecs,
                [eventType]: event.target.value
            }
        });
    } 

    render() {
        return (
            <div className="formPanel specs">
                <h1>Brew Specifications</h1>

                <label>Method:</label>
                <input onChange={(event) => this.handleChange(event, 'method')}></input>

                <label>Roast:</label>
                <input onChange={(event) => this.handleChange(event, 'roast')}></input>

                <label>Grind:</label>
                <input onChange={(event) => this.handleChange(event, 'grind')}></input>

                <label>Origin:</label>
                <input onChange={(event) => this.handleChange(event, 'origin')}></input>

                <label>Amount of coffee:</label>
                <input onChange={(event) => this.handleChange(event, 'amount_coffee')}></input>

                <label>Amount of water:</label>
                <input onChange={(event) => this.handleChange(event, 'amount_water')}></input>

                <button onClick={this.handleSubmit}>Time it</button>
            </div>
        )
    }
}

export default connect(mapStoreToProps)(BrewSpecs);