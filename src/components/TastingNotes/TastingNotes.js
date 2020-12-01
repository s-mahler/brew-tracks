import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class TastingNotes extends Component {

    handleSubmit = () => {
        this.props.dispatch({type: 'ADD_BREW', payload: this.props.store.inputs});
        this.props.history.push(`/brews/${this.props.store.user.id}`);
    };

    handleChange = (event, eventType) => {
        this.props.dispatch({type: 'ADD_TASTING', payload: {key: eventType, value: event.target.value}});
    } 

    render() {
        return (
            <div className="formPanel brew">
                <h1>Tasting Notes</h1>

                <label>Aroma:</label>
                <input className="input is-rounded" onChange={(event) => this.handleChange(event, 'aroma')}></input>

                <label>Taste:</label>
                <input className="input is-rounded" onChange={(event) => this.handleChange(event, 'taste')}></input>

                <label>Body:</label>
                <input className="input is-rounded" onChange={(event) => this.handleChange(event, 'body')}></input>

                <label>Mouth Feel:</label>
                <input className="input is-rounded" onChange={(event) => this.handleChange(event, 'mouth_feel')}></input>

                <button className="button" onClick={this.handleSubmit}>Finish</button>
            </div>
        )
    }
}

export default connect(mapStoreToProps)(TastingNotes);