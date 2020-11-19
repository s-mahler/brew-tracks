import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import BrewList from '../BrewList/BrewList';

class Brews extends Component {

    startAgain = () => {
        this.props.history.push('/specs')
    }

    accountDetails = () => {
        this.props.history.push('/user')
    }

    goToDetails = () => {
        this.props.history.push('/details');
    };

    render() {
        return (
            <>
                <button onClick={this.accountDetails}>Account Details</button>
                <h1>Your brews</h1>
                <ul>
                    <BrewList goToDetails={this.goToDetails}/>
                </ul>
                <button onClick={this.startAgain}>Start new brew</button>
            </>
        )
    }
}

export default connect(mapStoreToProps)(Brews);