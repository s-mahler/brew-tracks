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
        this.props.dispatch({type: 'ADD_BREW', payload: this.props.store.inputs})
        this.props.history.push(`/brews/${this.props.store.user.id}`);
    };

    handleChange = (event, eventType) => {
        this.setState({
            newTasting: {
                ...this.state.newTasting,
                [eventType]: event.target.value
            }
        });
        this.props.dispatch({type: 'ADD_TASTING', payload: this.state.newTasting});
    } 

    render() {
        return (
            <div className="formPanel tasting">
                <h1>Tasting Notes</h1>

                <label>Taste:</label>
                <input onChange={(event) => this.handleChange(event, 'taste')}></input>

                <label>Aroma:</label>
                <input onChange={(event) => this.handleChange(event, 'aroma')}></input>

                <label>Body:</label>
                <input onChange={(event) => this.handleChange(event, 'body')}></input>

                <label>Mouth Feel:</label>
                <input onChange={(event) => this.handleChange(event, 'mouth_feel')}></input>

                <button onClick={this.handleSubmit}>Finish</button>
            </div>
        )
    }
}

export default connect(mapStoreToProps)(TastingNotes);