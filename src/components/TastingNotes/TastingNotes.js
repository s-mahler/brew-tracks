import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class TastingNotes extends Component {

    handleSubmit = () => {
        this.props.history.push(`/brews/${this.props.store.user.id}`)
    };

    render() {
        return (
            <div className="formPanel tasting">
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
            </div>
        )
    }
}

export default connect(mapStoreToProps)(TastingNotes);