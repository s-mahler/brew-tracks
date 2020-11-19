import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './BrewDetails.css';

class BrewDetails extends Component {

    // TO DO STILL
    // GET for times

    state = {
        toggle: true
    }

    goBack = () => {
        this.props.history.push(`/brews/${this.props.store.user.id}`)
    }

    componentDidMount = () => {
        this.getSpecificBrew();
    }

    getSpecificBrew = () => {
        this.props.dispatch({type: 'GET_SPECIFIC_BREW', payload: this.props.match.params.id});
    }

    toggleView = () => {
        this.setState({
            toggle: !this.state.toggle,
        });
    }

    render() {
        return (
            <>


                {this.state.toggle ? (

                <>
                <button onClick={this.toggleView}>Edit</button>
                <h1>Brew Details</h1>
                {this.props.store.brew.map(brew => {
                    return <div key={brew.id}>
                                <div className="specs">
                                    <label>Method:</label>
                                    <p>{brew.brew_method}</p>

                                    <label>Origin:</label>
                                    <p>{brew.origin}</p>

                                    <label>Roast:</label>
                                    <p>{brew.roast}</p>

                                    <label>Grind:</label>
                                    <p>{brew.grind}</p>

                                    <label>Amount of Coffee:</label>
                                    <p>{brew.coffee_amount}</p>

                                    <label>Amount of Water:</label>
                                    <p>{brew.water_amount}</p>
                                </div>

                                <div className="tasting">
                                    <label>Aroma:</label>
                                    <p>{brew.aroma}</p>

                                    <label>Taste:</label>
                                    <p>{brew.taste}</p>

                                    <label>Body:</label>
                                    <p>{brew.body}</p>

                                    <label>Mouth Feel:</label>
                                    <p>{brew.mouth_feel}</p>
                                </div>
                            </div>
                    })}
                    </>

                ) : (

                    <div>
                        <button onClick={this.toggleView}>Save</button>
                        <h1>Brew Details</h1>
                        <div className="specs">
                                    <label>Method:</label>
                                    <input></input>

                                    <label>Origin:</label>
                                    <input></input>

                                    <label>Roast:</label>
                                    <input></input>

                                    <label>Grind:</label>
                                    <input></input>

                                    <label>Amount of Coffee:</label>
                                    <input></input>

                                    <label>Amount of Water:</label>
                                    <input></input>
                                </div>

                                <div className="tasting">
                                    <label>Aroma:</label>
                                    <input></input>

                                    <label>Taste:</label>
                                    <input></input>

                                    <label>Body:</label>
                                    <input></input>

                                    <label>Mouth Feel:</label>
                                    <input></input>
                                </div>
                    </div>

                )}
                <button onClick={this.goBack}>Back</button>
            </>
        )
    }
}

export default connect(mapStoreToProps)(BrewDetails);