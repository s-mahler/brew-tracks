import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class TastingNotes extends Component {

    handleSubmit = () => {
        this.props.history.push('/brews')
    };

    render() {
        return (
            <>
                <h1>Tasting Notes</h1>

                <label>Taste:</label>
                <input></input>

                <label>Aroma:</label>
                <input></input>

                <label>Body:</label>
                <input></input>

                <label>Mouth Feel:</label>
                <input></input>

                <button onClick={this.handleSubmit}>Finish</button>
            </>
        )
    }
}

export default connect(mapStoreToProps)(TastingNotes);