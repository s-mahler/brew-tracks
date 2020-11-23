import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class BrewSpecs extends Component {

    state = {
        newSpecs:{
            brew_id: 0,
            method: '',
            roast: '',
            grind: '',
            origin: '',
            amount_coffee: '',
            amount_water: ''
        }
    }

    componentDidMount = () => {
        this.getAllBrews();
    }

    getAllBrews = () => {
        this.props.dispatch({type: 'GET_ALL_BREWS'});
    }

    handleSubmit = () => {
        this.props.dispatch({type: 'ADD_SPECS', payload: this.state.newSpecs});
        this.props.history.push('/timer')
    };

    handleChange = (event, eventType) => {
        this.setState({
            newSpecs: {
                ...this.state.newSpecs,
                brew_id: this.props.store.brew[this.props.store.brew.length - 1].id + 1,
                [eventType]: event.target.value
            }
        });
    } 

    render() {
        return (
            <div className="formPanel brew">
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