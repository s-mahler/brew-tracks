import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class TastingNotes extends Component {

    state = {
        newTasting:{
            taste: '',
            aroma: '',
            body: '',
            mouth_feel: '',
        }
    }

    handleSubmit = () => {
        this.props.dispatch({type: 'ADD_BREW', payload: this.props.store.inputs});
        this.props.history.push(`/brews/${this.props.store.user.id}`);
    };

    handleChange = (event, eventType) => {
        this.props.dispatch({type: 'ADD_TASTING', payload: {key: eventType, value: event.target.value}});
    } 

    populate = () => {
        this.setState({
            newTasting: {
                taste: 'acidic, berry',
                aroma: 'blueberries',
                body: 'light',
                mouth_feel: 'watery',
            }
        })
    }

    render() {
        return (
            <div className="formPanel brew">
                <h1 onClick={this.populate}>Tasting Notes</h1>

                <label>Aroma:</label>
                <input className="input is-rounded" value={this.state.newTasting.aroma} onChange={(event) => this.handleChange(event, 'aroma')}></input>

                <label>Taste:</label>
                <input className="input is-rounded" value={this.state.newTasting.taste} onChange={(event) => this.handleChange(event, 'taste')}></input>

                <label>Body:</label>
                <input className="input is-rounded" value={this.state.newTasting.body} onChange={(event) => this.handleChange(event, 'body')}></input>

                <label>Mouth Feel:</label>
                <input className="input is-rounded" value={this.state.newTasting.mouth_feel} onChange={(event) => this.handleChange(event, 'mouth_feel')}></input>

                <button className="button" onClick={this.handleSubmit}>Finish</button>
            </div>
        )
    }
}

export default connect(mapStoreToProps)(TastingNotes);