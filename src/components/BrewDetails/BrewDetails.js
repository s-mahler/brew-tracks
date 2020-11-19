import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class BrewDetails extends Component {

    goBack = () => {
        this.props.history.push('/brews')
    }

    render() {
        return (
            <>
                <button>Edit</button>
                <h1>Brew Details</h1>
                <p>Will be populated from DB</p>
                <button onClick={this.goBack}>Back</button>
            </>
        )
    }
}

export default connect(mapStoreToProps)(BrewDetails);