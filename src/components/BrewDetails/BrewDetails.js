import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class BrewDetails extends Component {

    goBack = () => {
        this.props.history.push(`/brews/${this.props.store.user.id}`)
    }

    componentDidMount = () => {
        this.getSpecificBrew();
    }

    getSpecificBrew = () => {
        this.props.dispatch({type: 'GET_SPECIFIC_BREW', payload: this.props.match.params.id});
    }

    render() {
        return (
            <>
                <button>Edit</button>
                <h1>Brew Details</h1>
                <p>Will be populated from DB</p>
                {this.props.store.brew.map(brew => {
                        return <div onClick={() => this.goToDetails(brew.id)}>
                                    <div className="specs">
                                        <p>{brew.brew_method}</p>
                                        <p>{brew.origin}</p>
                                        <p>{brew.roast}</p>
                                        <p>{brew.grind}</p>
                                        <p>{brew.coffee_amount}</p>
                                        <p>{brew.water_amount}</p>
                                    </div>

                                    <div>
                                        <p>{brew.aroma}</p>
                                        <p>{brew.taste}</p>
                                        <p>{brew.body}</p>
                                        <p>{brew.mouth_feel}</p>
                                    </div>
                                </div>
                    })}

                <button onClick={this.goBack}>Back</button>
            </>
        )
    }
}

export default connect(mapStoreToProps)(BrewDetails);